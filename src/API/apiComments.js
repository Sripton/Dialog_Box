import express from "express";

import { Post, Comment } from "../db/models";

const router = express.Router();

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { commentTitle } = req.body;
  try {
    const findPostID = await Post.findOne({ where: { id } });
    const сomment = await Comment.create({
      commentTitle,
      user_id: req.session.userID,
      post_id: findPostID.id,
    });
    res.json(сomment);
  } catch (error) {
    console.log(error);
  }
});



router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findOnePostID = await Post.findOne({ where: { id } });
    const findAllCommentForPostID = await Comment.findAll({
      where: { post_id: findOnePostID.id },
      include: { model: Post },
      order: [["createdAt", "DESC"]],
    });
    res.json(findAllCommentForPostID);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getonecomment/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findOneComments = await Comment.findOne({
      where: { id },
      include: { model: Post },
    });
    res.json(findOneComments);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { commentTitle } = req.body;
  try {
    const putCommentsID = await Comment.update(
      { commentTitle, order: [["createdAt", "DESC"]] },
      {
        where: { id },
      }
    );
    res.json(putCommentsID);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(401);
    console.log(error);
  }
});

export default router;

import express from "express";
import { Postdislike, Post } from "../db/models";

const router = express.Router();

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findPostID = await Post.findOne({ where: { id } });
    const createPostDisLike = await Postdislike.create({
      user_id: req.session.userID,
      post_id: findPostID.id,
    });
    res.json(createPostDisLike);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findOnePost = await Post.findOne({ where: { id } });
    const findAllPostDisLike = await Postdislike.findAll({
      where: { post_id: findOnePost.id },
    });
    res.json(findAllPostDisLike);
  } catch (error) {
    console.log(error);
  }
});

export default router;

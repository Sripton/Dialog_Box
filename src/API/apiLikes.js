import express from "express";
import { where } from "sequelize";
import { Postlike, Post } from "../db/models";
import checkDuplicateLike from "../MW/oneLikeProtection";

const router = express.Router();

router.post("/:id", checkDuplicateLike, async (req, res) => {
  const { id } = req.params;
  try {
    const findOnePostID = await Post.findOne({ where: { id } });
    await Postlike.create({
      user_id: req.session.userID,
      post_id: findOnePostID.id,
    });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findOnePost = await Post.findOne({ where: { id } });
    const findAllPostLike = await Postlike.findAll({
      where: {
        post_id: findOnePost.id,
      },
    });
    res.json(findAllPostLike);
  } catch (error) {
    console.log(error);
  }
});

// router.get("/getlikestatus", async (req, res) => {
//   const { user_id, post_id } = req.query;
//   try {
//     const like = await Postlike.findOne({ where: { user_id, post_id } });
//     if (like) {
//       res.sendStatus(200).json({ liked: true });
//     } else {
//       res.sendStatus(200).json({ liked: false });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });
export default router;

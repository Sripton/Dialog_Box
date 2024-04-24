import express from "express";
import { Subject, Post } from "../db/models";

const router = express.Router();

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const findSubjectID = await Subject.findOne({ where: { id } });
    const createPosts = await Post.create({
      title,
      user_id: req.session.userID,
      subject_id: findSubjectID.id,
    });
    res.json(createPosts);
  } catch (error) {
    console.log(error);
  }
});



router.get("/countposts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findSubjectID = await Subject.findOne({ where: { id } });
    const findAllPost = await Post.findAll({
      where: { subject_id: findSubjectID.id },
      order: [["createdAt", "DESC"]],
    });
    res.json(findAllPost);
  } catch (error) {
    console.log(error);
  }
});

router.put("/changepost/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const changePost = await Post.update({ title }, { where: { id } });
    res.json(changePost);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Post.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(401);
    console.log(error);
  }
});

export default router;

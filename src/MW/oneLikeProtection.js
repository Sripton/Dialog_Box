import { Postlike, Post } from "../db/models";

async function checkDuplicateLike(req, res, next) {
  const { id } = req.params;
  const post_ID = await Post.findOne({ where: { id } });
  const user_ID = req.session.userID;
  const allPostLike = await Postlike.findAll();
  const existingLike = allPostLike.find(
    (like) => like.user_id === user_ID && like.post_id === post_ID.id
  );

  if (existingLike) {
    return res
      .sendStatus(403)
      .json({ error: "You have already liked this post" });
  }
  console.log("Yuo got like ");

  next();
}

export default checkDuplicateLike;

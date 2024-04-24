import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Postcard from "../Postcard";

export default function Postlist({ posts, setPosts, userIDSession }) {
  const { id } = useParams();
  useEffect(() => {
    fetch(`/api/posts/countposts/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);
  const deleteHandler = async (id) => {
    await fetch(`/api/posts/${id}`, { method: "DELETE" })
      .then(() => setPosts((prev) => prev.filter((data) => data.id !== id)))
      .catch((err) => console.log(err));
  };
  // console.log("posts in postlist", posts);
  return (
    <div>
      {posts?.length &&
        posts?.map((post) => (
          <Postcard
            key={post.id}
            id={post.id}
            post={post}
            deleteHandler={deleteHandler}
            userIDSession={userIDSession}
          />
        ))}
    </div>
  );
}

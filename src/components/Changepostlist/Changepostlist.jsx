import React from "react";

import Changepostcard from "../Changepostcard";

export default function Changepostlist({ posts, setPosts }) {
  return (
    <>
      {posts?.map((post) => (
        <Changepostcard key={post.id} post={post} setPosts={setPosts} />
      ))}
    </>
  );
}

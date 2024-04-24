import React from "react";
import { NavLink } from "react-router-dom";

export default function Postcard({ post, deleteHandler }) {
  return (
    <div className="containerposts">
      <div className="comment__container">
        <div className="comment__card">
          <p>{post.title}</p>
          <div className="comment__footer">
            <div>likes 123</div>
            <div>dislike 23</div>
            <div className="show__replays">replay 2</div>
          </div>
        </div>
        <NavLink to={`/changeposts/${post.id}`} className="put__post">
          ...
        </NavLink>
        <NavLink
          onClick={() => deleteHandler(post.id)}
          className="delete__post"
        >
          &times;
        </NavLink>
      </div>
    </div>
  );
}

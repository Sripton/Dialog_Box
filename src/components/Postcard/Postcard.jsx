import React from "react";
import { NavLink } from "react-router-dom";

export default function Postcard({ post, deleteHandler, userIDSession }) {
  return (
    <>
      {userIDSession !== post.user_id ? (
        <div className="containerposts" key={post.id}>
          <div className="comment__container">
            <div className="comment__card">
              <p>{post.title}</p>
              <div className="comment__footer">
                <div>likes 0</div>
                <div>dislike 0</div>
                <NavLink
                  to={`/commentpost/${post.id}`}
                  className="show__replays"
                >
                  replay 0
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="containerposts" key={post.id}>
          <div className="comment__container">
            <div className="comment__card">
              <p>{post.title}</p>
              <div className="comment__footer">
                <div>likes 0</div>
                <div>dislike 0</div>
                <NavLink
                  to={`/commentpost/${post.id}`}
                  className="show__replays"
                >
                  replay 0
                </NavLink>
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
      )}
    </>
  );
}

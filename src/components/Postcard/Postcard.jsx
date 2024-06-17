import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Postcard({
  post,
  deleteHandler,
  userIDSession
}) {
  const [counterComment, setCounterComment] = useState(0);
  useEffect(() => {
    fetch(`/api/comments/${post.id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setCounterComment(data))
      .catch((err) => console.log(err));
  }, []);

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
                 {`replay ${counterComment.length}`}
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
                  {" "}
                  {`replay ${counterComment.length}`}
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

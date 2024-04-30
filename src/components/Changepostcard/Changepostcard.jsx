import React, { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

export default function Changepostcard({ post, setPosts }) {
  const [changepost, setChangePost] = useState({
    title: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const changePostHandler = (e) => {
    setChangePost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHangePost = async (e) => {
    e.preventDefault();
    const responce = await fetch(`/api/posts/changepost/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(changepost),
    });
    if (responce.ok) {
      const data = await responce.json();
      setPosts(data);
      navigate(`/postlists/${post.subject_id}`);
    }
  };

  console.log("post in card", post.id);
  console.log("id in card", id);
  return (
    <>
      {post.id.toString() !== id ? (
        <div className="containerposts" key={post.id}>
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
      ) : (
        <div className="containerposts" key={post.id}>
          <div className="comment__container">
            <div className="comment__card">
              <form onSubmit={submitHangePost}>
                <textarea
                  className="changeposts"
                  name="title"
                  defaultValue={post.title || ""}
                  onChange={changePostHandler}
                />
                <button
                  className="buttonchangeposts"
                  type="submit"
                  id="publish"
                >
                  Готово
                </button>
              </form>

              <div className="comment__footer">
                <div>likes 123</div>
                <div>dislike 23</div>
                <NavLink to="/" className="show__replays">
                  replay 2
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

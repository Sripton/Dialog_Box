import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";

export default function Changepost({ setPosts, posts }) {
  const [changePost, setChangePost] = useState({
    title: "",
  });
  const [onePost, setOnePost] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`/api/posts/getonepost/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setOnePost(data))
      .catch((err) => console.log(err));
  }, []);
  const inputHandler = (e) => {
    setChangePost(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    fetch(`/api/posts/changepost/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title: changePost }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        navigate(`/postlists/${onePost.subject_id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {posts?.length &&
        posts?.map((post) =>
          post.id.toString() !== id ? (
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
              <form onSubmit={submitHandler} className="formaddcomment">
                <textarea
                  className="changepost"
                  name="title"
                  defaultValue={post.title}
                  onChange={inputHandler}
                />
                <button className="btncomment" type="submit">
                  Edit
                </button>
              </form>
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
          )
        )}
    </>
  );
}

import React, { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";

export default function Addposts({ setPosts }) {
  const [text, setText] = useState("");
  const [subject, setSubject] = useState({});
  const [counterpost, setCounterpost] = useState(0);
  const { id } = useParams();
  const textHandler = (e) => {
    setText(e.target.value);
  };
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    await fetch(`/api/posts/${id}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title: text }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        navigate(`/postlists/${id}`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`/api/subjects/getonesubject/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setSubject(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`/api/posts/countposts/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setCounterpost(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="wrapperposts">
      <div
        className="containerpost"
        style={{
          backgroundImage: `url(${subject.img})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="headposts">
          <h1 style={{ color: "white" }}>Добавить пост к теме:</h1>
        </div>

        <div className="comment" style={{ color: "white" }}>
          <h2 className="comment__title1" style={{ color: "white" }}>
            {subject.subjectName}
          </h2>
          <NavLink to={`/postlists/${id}`} className="comment__title2">
            Постов
            <span id="comment"> {`${counterpost.length}`}</span>
          </NavLink>
        </div>

        <div className="commentboxposts">
          <div className="contentposts">
            <form onSubmit={submitHandler}>
              <div className="commentinputposts">
                <textarea
                  name="title"
                  value={text.title}
                  className="usercommentposts"
                  onChange={textHandler}
                />
                <button className="buttonsposts" type="submit" id="publish">
                  Опубликовать
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

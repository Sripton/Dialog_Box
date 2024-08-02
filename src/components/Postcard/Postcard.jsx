import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Postcard({ post, deleteHandler, userIDSession }) {
  const [counterComment, setCounterComment] = useState(0);
  const [likes, setLikes] = useState([]);
  const [disLikes, setDisLikes] = useState({});
  const [postDate, setPostDate] = useState([]);
  // const [getLike, setGetLike] = useState([]);
  const [getDisLike, setGetDisLike] = useState([]);

  const handleLikes = async () => {
    try {
      const responce = await fetch(`/api/likes/${post.id}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(likes),
      });
      if (responce.ok) {
        setLikes([...likes, { user_id: userIDSession }]); //  или use post.id
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDisLikes = async () => {
    try {
      const responce = await fetch(`/api/dislikes/${post.id}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(disLikes),
      });
      if (responce.ok) {
        setDisLikes(responce.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch(`/api/posts/getonepost/${post.id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setPostDate(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`/api/comments/${post.id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setCounterComment(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`/api/likes/${post.id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setLikes(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`/api/dislikes/${post.id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setGetDisLike(data);
      })
      .catch((err) => console.log(err));
  }, []);
  const likeUserID = likes
    .filter((like) => like.user_id === userIDSession)
    .pop();

  return (
    <>
      {userIDSession !== post.user_id ? (
        <div className="containerposts" key={post.id}>
          <div className="comment__container">
            <div className="comment__card">
              <p>{post.title}</p>
              <div className="comment__footer">
                <div className="author__info">
                  <div className="author__time">
                    Создано{" "}
                    <span>
                      {`${new Date(
                        Date.parse(postDate.createdAt)
                      ).toLocaleString()}`}
                    </span>
                  </div>
                  <div className="author__name">
                    Автор
                    <span>{` ${postDate?.User?.userName}`}</span>
                  </div>
                </div>

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
                <NavLink onClick={handleLikes} className="fa fa-thumbs-up" />
                <i className="fa fa-thumbs-down" />
                <NavLink
                  to={`/commentpost/${post.id}`}
                  className="show__replays"
                >
                  {" "}
                  {`replay ${counterComment.length}`}
                </NavLink>
              </div>
              <div className="author__info">
                <div className="author__time">
                  Создано{" "}
                  <span>
                    {` ${new Date(
                      Date.parse(postDate.createdAt)
                    ).toLocaleString()}`}
                  </span>
                </div>
                <div className="author__name">
                  Автор
                  <span>{` ${postDate?.User?.userName}`}</span>
                </div>
              </div>
            </div>
            <NavLink to={`/changeposts/${post.id}`} className="put__post">
              <i className="fa fa-pencil" />
            </NavLink>
            <NavLink
              onClick={() => deleteHandler(post.id)}
              className="delete__post"
            >
              <i className="fa fa-times-rectangle" />
            </NavLink>
          </div>
        </div>
      )}
      <div className="like__block">
        <NavLink
          onClick={handleLikes}
          className={`fa fa-thumbs-up ${
            userIDSession === likeUserID?.user_id ? "thumbs__like__active" : ""
          }`}
        />
        <span className="like__thumbs">{likes.length}</span>
        <NavLink onClick={handleDisLikes} className="fa fa-thumbs-down" />{" "}
        <span className="dislike__thumbs">{getDisLike.length}</span>
      </div>
    </>
  );
}

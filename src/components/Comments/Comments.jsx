import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Modeladdcomments from "../Modeladdcomments";

export default function Comments({ comments, setComments, userIDSession }) {
  const [post, setPost] = useState([]);
  const [textArea, setTextArea] = useState({
    commentTitle: "",
  });
  const [editCommentID, setEditCommentID] = useState("");
  const [editCommentText, setEditCommentText] = useState("");
  const [modalaAddComments, setModalAddComments] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    fetch(`/api/posts/getonepost/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`/api/comments/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.log(err));
  }, []);
  const inputCommentHandler = (e) => {
    setTextArea((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitCommentHandler = async (e) => {
    e.preventDefault();
    const responce = await fetch(`/api/comments/${id}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(textArea),
    });
    if (responce.ok) {
      const data = await responce.json();
      setComments([data, ...comments]);
      setTextArea("");
    }
  };

  const editHandler = (comment) => {
    setEditCommentID(comment.id);
    setEditCommentText(comment.commentTitle);
  };

  const submitEditCommentHandler = async (e) => {
    e.preventDefault();
    const responce = await fetch(`/api/comments/${editCommentID}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ commentTitle: editCommentText }),
    });

    if (responce.ok) {
      const comment = comments.find((com) => com.id === editCommentID);
      if (!comment) {
        return;
      }
      comment.commentTitle = editCommentText;
      const commentIndex = comments
        .map((comment) => comment.id)
        .indexOf(editCommentID);
      if (commentIndex === -1) {
        return;
      }
      comments.splice(commentIndex, 1, comment);
      setComments(comments);
      setEditCommentID("");
    }
  };

  const deleteHandlerComments = async (idComment) => {
    await fetch(`/api/comments/${idComment}`, { method: "DELETE" })
      .then(() => {
        setComments((prev) => prev.filter((data) => data.id !== idComment));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="containerposts">
        <div className="comment__container">
          <div className="comment__card">
            <p>{post.title}</p>
            <div className="comment__footer">
              <div>likes 123</div>
              <div>dislike 23</div>
              <NavLink
                onClick={() => setModalAddComments(true)}
                className="show__replays"
              >
                replay 2
              </NavLink>
            </div>
          </div>
        </div>

        {comments?.length &&
          comments?.map((comment) =>
            userIDSession !== comment.user_id ? (
              <div className="containerposts" key={comment.id}>
                <div className="comment__container">
                  <div className="comment__card">
                    <p>{comment.commentTitle}</p>
                    <div className="comment__footer">
                      <div>likes 123</div>
                      <div>dislike 23</div>
                      <div className="show__replays">replay 2</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="containerposts" key={comment.id}>
                <div className="comment__container">
                  <div className="comment__card">
                    {editCommentID === comment.id ? (
                      <form
                        onSubmit={submitEditCommentHandler}
                        className="formChangecomment"
                      >
                        <textarea
                          className="changeComments"
                          name="commentTitle"
                          value={editCommentText}
                          onChange={(e) => setEditCommentText(e.target.value)}
                        />
                        <button className="btncomment" type="submit">
                          Edit
                        </button>
                      </form>
                    ) : (
                      <p>{comment.commentTitle}</p>
                    )}

                    <div className="comment__footer">
                      <div>likes 0</div>
                      <div>dislike 0</div>
                      <div className="show__replays">replay 0</div>
                    </div>

                    <NavLink
                      className="put__post"
                      onClick={(e) => {
                        e.preventDefault();
                        editHandler(comment);
                      }}
                    >
                      ...
                    </NavLink>
                    <NavLink
                      onClick={() => deleteHandlerComments(comment.id)}
                      className="delete__post"
                    >
                      &times;
                    </NavLink>
                  </div>
                </div>
              </div>
            )
          )}
        {/* <form onSubmit={submitCommentHandler} className="formaddcomment">
        <textarea
          className="addcomment"
          name="commentTitle"
          value={textArea.commentTitle || ""}
          onChange={inputCommentHandler}
        />
        <button className="btnComment" type="submit">
          Send
        </button>
      </form> */}
      </div>
      <Modeladdcomments
        modalaAddComments={modalaAddComments}
        submitCommentHandler={submitCommentHandler}
        textArea={textArea}
        inputCommentHandler={inputCommentHandler}
        onClose={() => setModalAddComments(false)}
      />
    </>
  );
}

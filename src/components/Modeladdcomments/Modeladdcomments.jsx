import React from "react";
import { NavLink } from "react-router-dom";

export default function Modeladdcomments({
  modalaAddComments,
  submitCommentHandler,
  textArea,
  inputCommentHandler,
  onClose,
}) {
  return (
    <>
      {modalaAddComments && (
        <div className="modal__comment__container">
          <div className="modal__comment__block">
            <NavLink
              onClick={() => onClose()}
              className="modal__comment__close"
            >
              &times;
            </NavLink>
            <form
              onSubmit={submitCommentHandler}
              className="form__add__comment"
            >
              <textarea
                className="add__comment"
                name="commentTitle"
                value={textArea.commentTitle || ""}
                onChange={inputCommentHandler}
              />
              <button className="btn__comment" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

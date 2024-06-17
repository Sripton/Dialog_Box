import React from "react";
import { NavLink } from "react-router-dom";

export default function Modal({ modalActive, onClose, subject, subjectID }) {
  return (
    <>
      {modalActive && (
        <div className="modal__container" key={subject}>
          <div className="modal__block">
            <img className="modal__img" src={`${subject.img}`} alt="subject" />
            <div className="modal__close" onClick={() => onClose()}>
              &times;
            </div>

            <NavLink
              to={`/addposts/${subjectID}`}
              className="modal__link-addpost"
            >
              Добавить пост
            </NavLink>
            <NavLink
              to={`/postlists/${subject.id}`}
              className="modal__link-dialog"
            >
              Перейти к обсуждениям
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}

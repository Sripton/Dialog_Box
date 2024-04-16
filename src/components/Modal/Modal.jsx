import React from "react";

export default function Modal({ modalActive, onClose, subject }) {
  return (
    <>
      {modalActive && (
        <div className="modal__container" key={subject.id}>
          <div className="modal__block">
            <img className="modal__img" src={`${subject.img}`} alt="subject" />
            <div className="modal__close" onClick={() => onClose()}>
              x
            </div>
            <div className="modal__link-addpost">Добавить пост</div>
            <div className="modal__link-dialog">К диалогу</div>
            <hr className="modal__hr" />
          </div>
        </div>
      )}
    </>
  );
}

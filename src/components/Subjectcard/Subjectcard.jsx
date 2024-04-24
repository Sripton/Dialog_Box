import React, { useState } from "react";
import Modal from "../Modal";

export default function Subjectcard({ id, subject }) {
  const [modalActive, setModalActive] = useState(false);
  // console.log("id", id);
  return (
    <>
      <div className="card__container" key={subject.id}>
        <button type="button" className="btn">
          <article className="card__article">
            <img
              src={`${subject.img}`}
              alt="biology"
              className="card__img"
              onClick={() => setModalActive(true)}
            />
            <div className="card__data">
              <span className="card__description">{subject.subjectName}</span>
            </div>
          </article>
        </button>
      </div>
      <Modal
        modalActive={modalActive}
        onClose={() => setModalActive(false)}
        subject={subject}
        subjectID={id}
      />
    </>
  );
}

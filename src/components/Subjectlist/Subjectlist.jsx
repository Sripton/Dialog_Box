import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../Modal";
import Subjectcard from "../Subjectcard";

export default function Subjectlist() {
  const [subjects, setSubjects] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/subjects/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch((err) => console.log(err));
  }, []);

  const getImgSrc = (e) => {
    e.target.getAttribute("src");
  };
  // console.log("id", id);
  // console.log("subjects", subjects);
  // console.log("srcURL", srcURL);

  return (
    <div className="container">
      {subjects?.map((subject) => (
        <Subjectcard key={subject.id} id={subject.id} subject={subject} />
      ))}
    </div>

    // <div className="container">
    //   {subjects?.map((subject) => (
    //     <>
    //       <div className="card__container" key={subject.id}>
    //         <button type="button" className="btn">
    //           <article className="card__article" onClick={getImgSrc}>
    //             <img
    //               src={`${subject.img}`}
    //               alt="biology"
    //               className="card__img"
    //               onClick={() => setModalActive(true)}
    //             />
    //             <div className="card__data">
    //               <span className="card__description">
    //                 {subject.subjectName}
    //               </span>
    //             </div>
    //           </article>
    //         </button>
    //       </div>
    //       <Modal
    //         modalActive={modalActive}
    //         onClose={() => setModalActive(false)}
    //         subject={subject}
    //       />
    //     </>
    //   ))}
    // </div>
  );
}

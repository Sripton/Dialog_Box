import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  return (
    <div className="container">
      {subjects?.map((subject) => (
        <Subjectcard key={subject.id} id={subject.id} subject={subject} />
      ))}
    </div>
  );
}

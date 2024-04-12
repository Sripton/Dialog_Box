import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function Diection({}) {
    const [subjects, setSubjects] = useState([]);
  const { id } = useParams();

  console.log("id", id);
  return (
   <div>ddfff</div>
  )
}

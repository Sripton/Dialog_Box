import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Signup from "./Signup";
import Signin from "./Signin";
import Subjectlist from "./Subjectlist";
import Contentlist from "./Contentlist";

export default function App({ userID, userName, direction }) {
  const [userSession, setUserSession] = useState(userName || null);
  const [userIDSession, setUserIDsession] = useState(userID || null);
  const [directions, setDirections] = useState(direction || null);

  const navigate = useNavigate();
  const logoutHandler = async () => {
    const responce = await fetch(`/api/users/logout`);
    if (responce.ok) {
      setUserSession(null);
      setUserIDsession(null);
      navigate("/");
    }
  };

  return (
    <div>
      <Navbar
        userIDSession={userIDSession}
        userSession={userSession}
        logoutHandler={logoutHandler}
      />
      {/* <Tabcontent /> */}
      <Routes>
        <Route path="/" element={<Contentlist directions={directions} />} />
        <Route
          path="/signup"
          element={
            <Signup
              setUserSession={setUserSession}
              setUserIDsession={setUserIDsession}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <Signin
              setUserSession={setUserSession}
              setUserIDsession={setUserIDsession}
            />
          }
        />
        <Route path="/direction/:id" element={<Subjectlist />} />
      </Routes>
    </div>
  );
}

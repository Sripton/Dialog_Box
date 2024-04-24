import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Signup from "./Signup";
import Signin from "./Signin";
import Subjectlist from "./Subjectlist";
import Contentlist from "./Contentlist";
import Addposts from "./Addposts";
import Postlist from "./Postlist/Postlist";
import Changepostlist from "./Changepostlist";

export default function App({ userID, userName, direction, allPosts }) {
  const [userSession, setUserSession] = useState(userName || null);
  const [userIDSession, setUserIDsession] = useState(userID || null);
  const [posts, setPosts] = useState(allPosts || null);

  const navigate = useNavigate();
  const logoutHandler = async () => {
    const responce = await fetch(`/api/users/logout`);
    if (responce.ok) {
      setUserSession(null);
      setUserIDsession(null);
      navigate("/");
    }
  };

  // console.log("direction", direction);
  // console.log('posts', posts);
  return (
    <div>
      <Navbar
        userIDSession={userIDSession}
        userSession={userSession}
        logoutHandler={logoutHandler}
      />
      {/* <Tabcontent /> */}
      <Routes>
        <Route path="/" element={<Contentlist direction={direction} />} />
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
        <Route
          path="/addposts/:id"
          element={<Addposts setPosts={setPosts} />}
        />
        <Route
          path="/postlists/:id"
          element={<Postlist posts={posts} setPosts={setPosts} />}
        />
        <Route
          path="/changeposts/:id"
          element={<Changepostlist posts={posts} setPosts={setPosts} />}
        />
      </Routes>
    </div>
  );
}

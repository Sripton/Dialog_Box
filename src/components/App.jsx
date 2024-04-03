import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Signup from "./Signup";
import Signin from "./Signin";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

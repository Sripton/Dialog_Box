import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin({ setUserSession, setUserIDsession }) {
  const [inputs, setInputs] = useState({
    userLogin: "",
    userPassword: "",
  });
  const navigate = useNavigate();
  const inputHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const responce = await fetch(`/api/users/signin`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(inputs),
    });
    if (responce.ok) {
      const data = await responce.json();
      setUserSession(data.userName);
      setUserIDsession(data.userID);
      navigate("/");
    }
  };
  return (
    <div className="modal">
      <div className="modal__dialog">
        <div className="modal__content">
          <form onSubmit={submitHandler}>
            <div className="modal__title">Вход</div>
            <input
              required
              placeholder="Введите логин"
              name="userLogin"
              value={inputs.userLogin || ""}
              onChange={inputHandler}
              type="text"
              className="modal__input"
            />
            <input
              required
              placeholder="Введите пароль"
              name="userPassword"
              value={inputs.userPassword || ""}
              onChange={inputHandler}
              type="password"
              className="modal__input"
            />
            <button type="submit" className="btn btn_dark btn_min">
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

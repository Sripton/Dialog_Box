import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ setUserSession, setUserIDsession }) {
  const [inputs, setInputs] = useState({
    userName: "",
    userLogin: "",
    userPassword: "",
  });
  const navigate = useNavigate();
  const inputHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const responce = await fetch(`/api/users/signup`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(inputs),
    });
    if (responce.ok) {
      const data = await responce.json();
      // setUserSession(data); // выдаст объект { userName: [имя], userID: [id]
      setUserSession(data.userName); // выдаст только имя
      setUserIDsession(data.userID);
      setInputs("");
      navigate("/");
    }
  };
  // console.log("inputs", inputs);
  return (
    <div className="modal">
      <div className="modal__dialog">
        <div className="modal__content">
          <form onSubmit={submitHandler}>
            <div className="modal__title">Зарегистрируйтесь</div>
            <input
              required
              placeholder="Введите имя"
              name="userName"
              value={inputs.userName || ""}
              onChange={inputHandler}
              type="text"
              className="modal__input"
            />
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

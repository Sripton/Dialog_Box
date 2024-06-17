import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar({ userIDSession, userSession, logoutHandler }) {
  return (
    <div className="header">
      <div className="header-logo">
        <img src="/header/logo.png" alt="logotip" />
      </div>
      <div className="header-nav">
        {!userIDSession ? (
          <ul>
            <li>
              <NavLink to="/signup">Регистрация</NavLink>
            </li>
            <li>
              <NavLink to="/signin">Вход</NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/">О нас</NavLink>
            </li>
            <li>
              <NavLink to="/">Контакты</NavLink>
            </li>
          </ul>
        )}
      </div>
      {!userIDSession ? (
        <> </>
      ) : (
        <>
          <div className="header-userName">
            <h3> {` Привет ${userSession}`}</h3>
          </div>
          <div className="header-logout">
            <NavLink className="logout" to="/logout" onClick={logoutHandler}>
              Выход
            </NavLink>
          </div>
        </>
      )}

      <div className="header-icon">
        <a href="/facebook">
          <img src="/header/Facebook.png" alt="iconFacebook" />
        </a>
        <a href="/lindkedin">
          <img src="/header/Linkedin.png" alt="iconLinkedin" />
        </a>
        <a href="/twitter">
          <img src="/header/Twitter.png" alt="iconTwitter" />
        </a>
      </div>
    </div>
  );
}

import React from "react";

export default function Navbar() {
  return (
    <div className="header">
      <div className="header-logo">
        <img src="/header/logo.png" alt="logotip" />
      </div>
      <div className="header-nav">
        <ul>
          <li>
            <a href="/">О нас</a>
          </li>
          <li>
            <a href="/">Контакты</a>
          </li>
          <li>
            <a href="/">Регистрация</a>
          </li>
          <li>
            <a href="/">Вход</a>
          </li>
        </ul>
      </div>
      <div className="header-icon">
        <a href="/facebook">
          <img src="/header/Facebook.png" alt="iconFacebook" />
        </a>
        <a href="/lindkedin">
          <img src="header/Linkedin.png" alt="iconLinkedin" />
        </a>
        <a href="/twitter">
          <img src="header/Twitter.png" alt="iconTwitter" />
        </a>
      </div>
    </div>
  );
}

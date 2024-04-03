import React from "react";

export default function Signup() {
  return (
    <div className="modal">
      <div className="modal__dialog">
        <div className="modal__content">
          <form action="#">
            {/* <div data-close className="modal__close">
              &times;
            </div> */}
            <div className="modal__title">Зарегистрируйтесь</div>
            <input
              required
              placeholder="Введите имя"
              name="name"
              type="text"
              className="modal__input"
            />
            <input
              required
              placeholder="Введите логин"
              name="name"
              type="text"
              className="modal__input"
            />
            <input
              required
              placeholder="Введите пароль"
              name="phone"
              type="phone"
              className="modal__input"
            />
            <button type="button" className="btn btn_dark btn_min">
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

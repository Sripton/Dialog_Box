import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Contentlist({ directions }) {
  const [tab, setTab] = useState(1);
  return (
    <>
      {directions?.map((direction) =>
        tab === direction.id ? (
          <div className="tabcontainer" key={direction.id}>
            <div className="bgc_blue" />
            <div className="tabcontent">
              <img src={direction.img} alt="content" />
              <div className="tabcontent-description">
                {direction.description}
              </div>
            </div>
            <div className="tabheader">
              <div className="tabheader__title">
                <h3>Выберите тему</h3>
                <hr />
              </div>
              <div className="tabheader__items">
                <div
                  className={`tabheader__item ${
                    tab === 1 ? "tabheader__item_active" : ""
                  }`}
                  onClick={() => setTab(1)}
                >
                  Математика
                </div>
                <div
                  className={`tabheader__item ${
                    tab === 2 ? "tabheader__item_active" : ""
                  }`}
                  onClick={() => setTab(2)}
                >
                  История
                </div>
                <div
                  className={`tabheader__item ${
                    tab === 3 ? "tabheader__item_active" : ""
                  }`}
                  onClick={() => setTab(3)}
                >
                  Биология
                </div>
              </div>
            </div>

            <div className="getDialog">
              <NavLink className="getDialog_link" to={`/direction/${tab}`}>Перейти</NavLink>
            </div>
          </div>
        ) : (
          ""
        )
      )}
    </>
  );
}

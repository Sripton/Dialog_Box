import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Contentlist({ direction }) {
  const [tab, setTab] = useState(1);
  const currentDirection = direction.find((d) => d.id === tab);
  return (
    <div className="tabcontainer">
      <div className="bgc_blue" />
      
      <div className="tabcontent">
        <img src={currentDirection.img} alt="content" />
        <div className="tabcontent-description">
          {currentDirection.description}
        </div>
      </div>
      <div className="tabheader">
        <div className="tabheader__title">
          <h3>Выберите тему</h3>
          <hr />
        </div>
        <div className="tabheader__items">
          {direction?.map((direct) => (
            <div
              key={direct.id}
              className={`tabheader__item ${
                tab === direct.id ? "tabheader__item_active" : ""
              }`}
              onClick={() => setTab(direct.id)}
            >
              {direct.tabContent}
            </div>
          ))}
        </div>
      </div>
      <div className="getDialog">
        <NavLink className="getDialog_link" to={`/direction/${tab}`}>
          Перейти
        </NavLink>
      </div>
    </div>
  );
}

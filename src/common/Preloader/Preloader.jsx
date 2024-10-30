import React from "react";

//// icons
import logo from "../../assets/images/rihaLogo.png";

////// style
import "./style.scss";

const Preloader = () => {
  const text = "Загрузка ...";

  return (
    <div className="preloader">
      <img src={logo} alt="Логотип" className="pulse" />
      <p className="loading-text">
        {text.split("").map((letter, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            {letter}
          </span>
        ))}
      </p>
    </div>
  );
};

export default Preloader;

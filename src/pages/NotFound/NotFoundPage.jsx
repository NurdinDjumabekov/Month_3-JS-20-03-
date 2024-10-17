import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
      localStorage.clear();
    }, 3000);
  }, []);

  return (
    <div className="notFound">
      <div>
        {/* <img src={logo} alt="logo" /> */}
        <h1>Страница не найдена!</h1>
      </div>
    </div>
  );
};

export default NotFoundPage;

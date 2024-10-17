/////// hooks
import React from "react";
import { useNavigate } from "react-router-dom";

////// imgs
import lofOut from "../../../assets/images/logout.png";

////// style
import "./style.scss";

/////// components
import { Tooltip } from "@mui/material";

const LogOut = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/");
  };

  return (
    <Tooltip title={"Выйти"} placement="left">
      <div className="logOut">
        <button onClick={logOut}>
          <img src={lofOut} alt="()" />
        </button>
      </div>
    </Tooltip>
  );
};

export default LogOut;

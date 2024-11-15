import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";

export const Preloader = () => {
  const { preloader } = useSelector((state) => state.standartSlice);

  if (preloader) {
    return (
      <div className="preloader">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
};

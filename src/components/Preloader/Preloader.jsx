import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";

export const Preloader = () => {
  const { preloader } = useSelector((state) => state.sendDocsSlice);
  const { preloaderSel } = useSelector((state) => state.selectsSlice);
  const { preloaderAuth } = useSelector((state) => state.authSlice);

  if (preloaderAuth || preloaderSel || preloader) {
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

//////// hooks
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/////// components
import PointsMainPage from "./PointsMainPage/PointsMainPage";

const ActionsInPointsPage = () => {
  return (
    <Routes>
      <Route path="/" element={<ActionsInPointsPage />} />
      <Route path="/main" element={<PointsMainPage />} />
    </Routes>
  );
};

export default ActionsInPointsPage;

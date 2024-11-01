//////// hooks
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

/////// components
import PointsMainPage from "../../components/ActionsInPointsPage/RenderGoogleMaps/PointsMainPage/PointsMainPage";
import RenderGoogleMaps from "./RenderGoogleMaps/RenderGoogleMaps";
import ActionForPointsPage from "./ActionForPointsPage/ActionForPointsPage";
import PayActionPage from "./PayActionPage/PayActionPage";
import PointLists from "../../components/ActionsInPointsPage/PointLists/PointLists";

const ActionsInPointsPage = () => {
  return (
    <Routes>
      <Route path="/" element={<ActionsInPointsPage />} />
      <Route path="/main" element={<PointsMainPage />} />
      <Route path="/maps" element={<RenderGoogleMaps />} />
      <Route path="/list_day" element={<PointLists />} />
      <Route path="/actions" element={<ActionForPointsPage />} />
      <Route path="/pay" element={<PayActionPage />} />
    </Routes>
  );
};

export default ActionsInPointsPage;

//////// hooks
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

/////// components
import PointsMainPage from "../../components/ActionsInPointsPage/RenderGoogleMaps/PointsMainPage/PointsMainPage";
import RenderGoogleMaps from "./RenderGoogleMaps/RenderGoogleMaps";
import ActionForPointsPage from "./ActionForPointsPage/ActionForPointsPage";
import PayActionPage from "./PayActionPage/PayActionPage";
import PointLists from "../../components/ActionsInPointsPage/PointLists/PointLists";
import HistoryPointsPage from "./HistoryPointsPage/HistoryPointsPage";
import PointListsAll from "../../components/ActionsInPointsPage/PointListsAll/PointLists";
import TasksPerfom from "../../components/ActionsInPointsPage/ActionForPointsPage/TasksPerfom/TasksPerfom";
import AddPointInRoutePage from "../AddPointInRoutePage/AddPointInRoutePage";
import AddPointsPage from "../AddPointsPage/AddPointsPage";

const ActionsInPointsPage = () => {
  return (
    <Routes>
      <Route path="/" element={<ActionsInPointsPage />} />
      <Route path="/main" element={<PointsMainPage />} />
      <Route path="/all_list" element={<PointListsAll />} />
      {/* <Route path="/maps" element={<RenderGoogleMaps />} /> */}
      <Route path="/list" element={<PointLists />} />
      <Route path="/history" element={<HistoryPointsPage />} />
      <Route path="/actions" element={<ActionForPointsPage />} />
      <Route path="/pay" element={<PayActionPage />} />
      <Route path="/tasks_perform" element={<TasksPerfom />} />
      <Route path="/add_route" element={<AddPointInRoutePage />} />
      <Route path="/create_new" element={<AddPointsPage />} />
    </Routes>
  );
};

export default ActionsInPointsPage;

////hooks
import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//// pages
import MainLayouts from "../layouts/MainLayouts/MainLayouts";

//// components
// import { Preloader } from "../components/Preloader/Preloader";

////fns

/////// pages
import LoginPage from "../pages/LoginPage/LoginPage";
import MapsPage from "../pages/MapsPage/MapsPage"; /// delete
import CameraPage from "../pages/CameraPage/CameraPage"; /// delete
import SendInvoicePage from "../pages/SendInvoicePage/SendInvoicePage"; /// delete
import AddPointsPage from "../pages/AddPointsPage/AddPointsPage"; /// delete
import AddPointInRoutePage from "../pages/AddPointInRoutePage/AddPointInRoutePage"; /// delete
import TakeMoneyPage from "../pages/TakeMoneyPage/TakeMoneyPage"; /// delete
import AllCategPage from "../pages/AllCategPage/AllCategPage";
import LeftoversPage from "../pages/LeftoversPage/LeftoversPage";
import ReturnPage from "../pages/ReturnPage/ReturnPage"; /// delete
import TasksPage from "../pages/TasksPage/TasksPage"; /// delete
import ReturnsPages from "../pages/ReturnsPages/ReturnsPages";
import ExpensePage from "../pages/ExpensePage/ExpensePage";
import ApplicationsPages from "../pages/ApplicationsPages/ApplicationsPages";
import PayPage from "../pages/PayPage/PayPage";
import ActionsInPointsPage from "../pages/ActionsInPointsPage/ActionsInPointsPage";
import WorkshopPages from "../pages/WorkshopPages/WorkshopPages";

const MainRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { dataSave } = useSelector((state) => state.saveDataSlice);
  const { listProds, listTA } = useSelector((state) => state.mainSlice);
  const { listTitleOrders } = useSelector((state) => state.mainSlice);
  const { listOrders, invoiceInfo } = useSelector((state) => state.mainSlice);
  const { activeRouteList } = useSelector((state) => state.photoSlice);
  const { mapGeo, listRouteAllTA } = useSelector((state) => state.mapSlice);

  return (
    <Routes>
      {!!!dataSave?.guid ? (
        <Route path="/" element={<LoginPage />} />
      ) : (
        <Route element={<MainLayouts />}>
          <Route path="/" element={<AllCategPage />} />
          <Route path="/app/*" element={<ApplicationsPages />} />
          <Route path="/invoice/*" element={<WorkshopPages />} />
          <Route path="/leftovers" element={<LeftoversPage />} />
          <Route path="/expense" element={<ExpensePage />} />
          <Route path="/points/*" element={<ActionsInPointsPage />} />
          <Route path="/pay" element={<PayPage />} />
          <Route path="/return/*" element={<ReturnsPages />} />
        </Route>
      )}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default MainRoutes;
/// user_type 2 - админ, 1 - агент
/// window.scrollTo({ top: 0, behavior: "smooth" });

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
import AllCategPage from "../pages/AllCategPage/AllCategPage";
import LeftoversPage from "../pages/LeftoversPage/LeftoversPage";
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
  const { listProds, listTA } = useSelector((state) => state.orderSlice);
  const { listTitleOrders } = useSelector((state) => state.orderSlice);
  const { listOrders, invoiceInfo } = useSelector((state) => state.orderSlice);
  const { activeRouteList } = useSelector((state) => state.photoSlice);

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
        </Route>
      )}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default MainRoutes;
/// user_type 2 - админ, 1 - агент
/// window.scrollTo({ top: 0, behavior: "smooth" });

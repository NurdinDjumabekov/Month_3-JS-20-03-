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
import MainPage from "../pages/MainPage/MainPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import MapsPage from "../pages/MapsPage/MapsPage";
import CameraPage from "../pages/CameraPage/CameraPage";
import SendInvoicePage from "../pages/SendInvoicePage/SendInvoicePage";
import AddPointsPage from "../pages/AddPointsPage/AddPointsPage";
import AddPointInRoutePage from "../pages/AddPointInRoutePage/AddPointInRoutePage";
import TakeMoneyPage from "../pages/TakeMoneyPage/TakeMoneyPage";
import AllCategPage from "../pages/AllCategPage/AllCategPage";
import LeftoversPage from "../pages/LeftoversPage/LeftoversPage";
import ReturnPage from "../pages/ReturnPage/ReturnPage";
import TasksPage from "../pages/TasksPage/TasksPage";
import InvoicesPages from "../pages/InvoicesPages/InvoicesPages";
import ReturnsPages from "../pages/ReturnsPages/ReturnsPages";
import ExpensePage from "../pages/ExpensePage/ExpensePage";

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
        <>
          <Route element={<MainLayouts />}>
            <Route path="/" element={<AllCategPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/invoice/*" element={<InvoicesPages />} />

            <Route path="/leftovers" element={<LeftoversPage />} />
            <Route path="/camera" element={<CameraPage />} />
            <Route path="/maps" element={<MapsPage />} />
            <Route path="/create_points" element={<AddPointsPage />} />
            <Route path="/add_points_route" element={<AddPointInRoutePage />} />
            <Route path="/return/*" element={<ReturnsPages />} />
            <Route path="/pay" element={<SettingsPage />} />
            <Route path="/expense" element={<ExpensePage />} />
          </Route>
          <Route
            path="/send_app/:route_guid/:guid_point/:type"
            element={<SendInvoicePage />}
          />
          <Route
            path="/maps_camera/:route_guid/:guid_point/:type"
            element={<CameraPage />}
          />
          <Route
            path="/take_money/:route_guid/:guid_point/:type"
            element={<TakeMoneyPage />}
          />
          <Route
            path="/tasks/:route_guid/:guid_point/:type"
            element={<TasksPage />}
          />
          <Route
            path="/return/:route_guid/:guid_point/:type"
            element={<ReturnPage />}
          />
        </>
      )}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default MainRoutes;
/// user_type 2 - админ, 1 - агент

// useEffect(() => {
//   (async () => {
//     try {
//       const data = await dispatch(TestTest()).unwrap();
//       console.log(data, "data");
//     } catch (error) {
//       // обработка ошибки
//     }
//   })();
// }, []);

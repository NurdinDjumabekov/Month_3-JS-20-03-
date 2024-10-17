///// hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

////// style
import "./style.scss";

////// components
import MenuAgents from "../../common/MenuAgents/MenuAgents";

/////// fns
import { getListTA } from "../../store/reducers/mainSlice";
import { getListWorkShop } from "../../store/reducers/mainSlice";
import { getPointsRouteAgent } from "../../store/reducers/mapSlice";
import { getActiveRouteList } from "../../store/reducers/photoSlice";

const MainLayouts = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { user_type, guid } = useSelector(
    (state) => state.saveDataSlice?.dataSave
  );

  useEffect(() => {
    dispatch(getListWorkShop());
    dispatch(getListTA({ first: true }));
    dispatch(getPointsRouteAgent({ guid, first: true }));
    dispatch(getActiveRouteList(guid)); /// только для ТА
    //// отправляю запрос для получения точек каждого агента
  }, []);

  const objMenu = { 1: <MenuAgents /> };
  /// user_type - 1 agent 2 admin

  const noPadding = user_type == 2 || pathname === "/maps";

  return (
    <div className="layouts">
      <div className={`pages ${noPadding ? "adminInfo" : ""}`}>
        <Outlet />
      </div>
      {/* {objMenu?.[user_type]} */}
    </div>
  );
};

export default MainLayouts;

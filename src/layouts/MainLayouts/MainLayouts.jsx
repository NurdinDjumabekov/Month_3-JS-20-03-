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
import { getActiveRouteList } from "../../store/reducers/photoSlice";
import { getBalance } from "../../store/reducers/standartSlice";

const MainLayouts = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { user_type, guid } = useSelector(
    (state) => state.saveDataSlice?.dataSave
  );

  useEffect(() => {
    dispatch(getListWorkShop());
    dispatch(getListTA({ first: true }));
    dispatch(getActiveRouteList(guid)); /// только для ТА
    //// отправляю запрос для получения точек каждого агента
    dispatch(getBalance(guid));
  }, []);

  const objMenu = { 1: <MenuAgents /> }; // delete
  /// user_type - 1 agent 2 admin

  const checkMap = "/points/maps" == pathname;

  return (
    <div className="layouts">
      <div className={`pages ${checkMap ? "mapsStyle" : ""}`}>
        <Outlet />
      </div>
      {/* {objMenu?.[user_type]} */}
    </div>
  );
};

export default MainLayouts;

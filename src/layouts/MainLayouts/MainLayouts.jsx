///// hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

////// style
import "./style.scss";

////// components

/////// fns
import { getListWorkShop } from "../../store/reducers/orderSlice";
import { getActiveRouteList } from "../../store/reducers/photoSlice";
import { getBalance } from "../../store/reducers/paySlice";

const MainLayouts = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { guid } = useSelector((state) => state.saveDataSlice?.dataSave);

  useEffect(() => {
    dispatch(getListWorkShop());
    dispatch(getActiveRouteList(guid)); /// только для ТА
    //// отправляю запрос для получения точек каждого агента
    dispatch(getBalance(guid));
  }, []);

  const checkMap = "/points/maps" == pathname;

  return (
    <div className="layouts">
      <div className={`pages ${checkMap ? "mapsStyle" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayouts;

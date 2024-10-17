////// hooks
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import MapHistory from "../MapHistory/MapHistory";

////// helpers

////// fns
import { getListTA } from "../../../store/reducers/mainSlice";
import { setActiveTA } from "../../../store/reducers/selectsSlice";
import { clearSelects } from "../../../store/reducers/selectsSlice";
import { getListRoutes_TA } from "../../../store/reducers/mapSlice";
import { setListPhotos } from "../../../store/reducers/photoSlice";
import { getActiveRouteList } from "../../../store/reducers/photoSlice";

////// style
import "./style.scss";

const HistoryRouteTA = () => {
  const dispatch = useDispatch();

  const { listTA } = useSelector((state) => state.mainSlice);
  const { activeDate } = useSelector((state) => state.selectsSlice);
  const { user_type } = useSelector((state) => state.saveDataSlice?.dataSave);

  const getData = async () => {
    try {
      dispatch(setListPhotos());
      await dispatch(getListTA({ first: true })).unwrap();
      const obj = { label: listTA?.[0]?.fio, value: listTA?.[0]?.guid };
      dispatch(setActiveTA(obj));
      const data = { agent_guid: listTA?.[0]?.guid, user_type, activeDate };
      await dispatch(getListRoutes_TA(data)).unwrap(); // get историб маршрутов
      await dispatch(getActiveRouteList(listTA?.[0]?.guid));
      //// отправляю запрос для получения точек каждого агента
    } catch (error) {}
  };

  useEffect(() => {
    getData();
    return () => dispatch(clearSelects());
  }, []);

  return (
    <div className="historyRouteTA">
      <MapHistory />
    </div>
  );
};

export default HistoryRouteTA;

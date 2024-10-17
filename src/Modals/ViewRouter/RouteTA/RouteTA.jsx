////// hooks
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

////// components
import MapForChoicePoints from "../MapForChoicePoints/MapForChoicePoints";

////// style
import "./style.scss";

////// helpers
import { transformLists } from "../../../helpers/transformLists";

////// fns
import { setActiveTA } from "../../../store/reducers/selectsSlice";
import EveryRouteTA from "../EveryRouteTA/EveryRouteTA";
import ActionsListRoute from "../ActionsListRoute/ActionsListRoute";
import EveryRouteListTT from "../EveryRouteListTT/EveryRouteListTT";
import ActionMapRoute from "../ActionMapRoute/ActionMapRoute";

const RouteTA = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="routeTA">
        <div className="listRoutes">
          <EveryRouteTA />
          <EveryRouteListTT />
        </div>
      </div>
      <ActionsListRoute />
      <ActionMapRoute />
    </>
  );
};

export default RouteTA;

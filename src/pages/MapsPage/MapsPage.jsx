////hooks
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// style
import "./style.scss";

////// components
import ActionsRouteTA from "../../Modals/ActionsRouteTA/ViewRouterTA";
import MapWrapper from "../../components/MapPage/MapWrapper/MapWrapper";
import ConfirmModal from "../../common/ConfirmModal/ConfirmModal";
import ActionsMapStatus from "../../components/MapPage/ActionsMapStatus/ActionsMapStatus";

/////// fns
import { getListRoutes_TA } from "../../store/reducers/mapSlice";
import { getActiveRouteList } from "../../store/reducers/photoSlice";
import { activeRouteListCRUD } from "../../store/reducers/photoSlice";

////// helpers
import { getMyGeo, transformDateTime } from "../../helpers/transformDate";
import { myAlert } from "../../helpers/MyAlert";

const MapsPage = () => {
  const dispatch = useDispatch();

  const { activeRouteList } = useSelector((state) => state.photoSlice);
  const { guid, user_type } = useSelector(
    (state) => state.saveDataSlice?.dataSave
  );

  const [searchMe, setSearchMe] = useState(false);
  const [closeRoute, setCloseRoute] = useState(false);

  const { dataSave } = useSelector((state) => state.saveDataSlice);
  const { activeDate } = useSelector((state) => state.selectsSlice);

  useEffect(() => {
    const obj = { agent_guid: dataSave?.guid, user_type, activeDate };
    dispatch(getListRoutes_TA(obj));
    ///  get данных координат точек для ТА

    dispatch(getActiveRouteList(guid)); /// только для ТА
    //// отправляю запрос для получения точек каждого агента
  }, []);

  const searchMeFN = () => setSearchMe(!searchMe);
  //// для поиска себя на карте

  const startEndListRoute = (type) => {
    if (type == 1) {
      myAlert(`Стартовое время ${transformDateTime(new Date())}`);
    }

    getMyGeo().then(({ lat, lon }) => {
      // начать маршрутный лист
      const data = {
        route_sheet_guid: activeRouteList?.guid,
        start_date: transformDateTime(new Date()),
        end_date: transformDateTime(new Date()),
        comment: ".",
        action_type: type, /// / 1 - Старт маршрутного листа, 2 - Конец
        lat,
        lon,
      };
      dispatch(activeRouteListCRUD({ data, guid, user_type }));
      setCloseRoute(false);
    });
  };

  return (
    <>
      <div className="map2Gis">
        <ActionsMapStatus
          startEndListRoute={startEndListRoute}
          setCloseRoute={setCloseRoute}
          searchMeFN={searchMeFN}
        />
        <MapWrapper searchMe={searchMe} />
        <ActionsRouteTA />
      </div>
      <ConfirmModal
        state={closeRoute}
        yesFN={() => startEndListRoute(2)}
        noFN={() => setCloseRoute(false)}
        title={"Завершить маршрут ?"}
      />
    </>
  );
};

export default MapsPage;

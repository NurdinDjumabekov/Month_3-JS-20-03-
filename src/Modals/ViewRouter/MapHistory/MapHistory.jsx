import { ru } from "date-fns/locale";

/////// hooks
import React, { useEffect, useState } from "react";
import { load } from "@2gis/mapgl";
import { useDispatch, useSelector } from "react-redux";

////// styles
import "./style.scss";

/////// helpers
import { styleRoutes, styleRoutesNoPlan } from "../../../helpers/objs";
import { transformLists } from "../../../helpers/transformLists";
import { reverseTransformActionDate } from "../../../helpers/transformDate";
import { transformActionDate } from "../../../helpers/transformDate";

/////// components
import { Directions } from "@2gis/mapgl-directions";
import DatePicker from "react-datepicker";
import Select from "react-select";
import MapMenuInfo from "../MapMenuInfo/MapMenuInfo";

////// fns
import { setActiveDate } from "../../../store/reducers/selectsSlice";
import { setActiveTA } from "../../../store/reducers/selectsSlice";
import { getListRoutes_TA } from "../../../store/reducers/mapSlice";
import { getDistance } from "../../../helpers/totals";
import { getActiveRouteList } from "../../../store/reducers/photoSlice";

const MapHistory = ({}) => {
  const dispatch = useDispatch();

  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [secondRoute, setSecondRoute] = useState(null); // Состояние для второго маршрута
  const [totalDistance, setTotalDistance] = useState(0); // Состояние для общего расстояния

  const { user_type } = useSelector((state) => state.saveDataSlice?.dataSave);
  const { mapGeo, everyRoutes_TA, listTA_RouteNoPlan, key, listPointsEveryTA } =
    useSelector((state) => state.mapSlice);

  const { activeTA, activeDate } = useSelector((state) => state.selectsSlice);
  const { listTA } = useSelector((state) => state.mainSlice);

  const onChange = (item) => {
    const obj = { agent_guid: item?.value, user_type, activeDate };
    dispatch(getListRoutes_TA(obj)); /// get данных координат точек определенного агента
    dispatch(setActiveTA(item)); /// активный state для селекта ТА
    dispatch(getActiveRouteList(item?.value));
    //// отправляю запрос для получения точек каждого агента
  };

  const onChangeDate = (item) => {
    dispatch(setActiveDate(transformActionDate(item))); /// активный state для селекта даты
    const obj = {
      agent_guid: activeTA?.value,
      user_type,
      activeDate: transformActionDate(item),
    };
    dispatch(getListRoutes_TA(obj)); /// get данных координат точек определенного агента
  };

  useEffect(() => {
    load().then((mapgl) => {
      const initializedMap = new mapgl.Map("mapContainerHistory", {
        center: [
          mapGeo?.longitude || 74.5975735,
          mapGeo?.latitude || 42.8508686,
        ],
        zoom: 13,
        key: key,
      });

      setMap(initializedMap);

      const directionsInstance = new Directions(initializedMap, {
        directionsApiKey: key,
      });
      setDirections(directionsInstance);

      initializedMap.mapgl = mapgl;
    });

    return () => {
      if (map) {
        map.destroy();
      }
    };
  }, [key, mapGeo]);

  useEffect(() => {
    if (map && everyRoutes_TA?.length > 0) {
      markers.forEach((m) => m.destroy());
      setMarkers([]);

      if (directions) {
        directions.clear();
      }

      const routePoints = everyRoutes_TA.map((point) => [
        parseFloat(point.lon),
        parseFloat(point.lat),
      ]);

      // Вычисление общего расстояния
      let distance = 0;
      for (let i = 0; i < everyRoutes_TA.length - 1; i++) {
        const point1 = everyRoutes_TA?.[i];
        const point2 = everyRoutes_TA?.[i + 1];
        distance += getDistance(
          parseFloat(point1.lat),
          parseFloat(point1.lon),
          parseFloat(point2.lat),
          parseFloat(point2.lon)
        );
      }
      setTotalDistance(distance);

      const newMarkers = everyRoutes_TA.map((point, index) => {
        const checkTA = !!point?.set_start_time; // если время есть, то ТА посетил точку
        const checkTIndex = !!point.sides; // если это начальный или конечный путь

        const markerNameClass = `customMarker__name ${
          checkTA ? "active" : ""
        } ${checkTIndex ? "workShop" : ""}`;
        const markerIndex = checkTIndex ? "" : `${index}.`;

        const customMarker = document.createElement("div");
        customMarker.className = "customMarker";
        customMarker.innerHTML = `
          <div class="customMarker__point"><i></i></div>
          <div class="${markerNameClass}">
            <p><span class="customMarker__index">${markerIndex}</span>${
          point?.point || "Цех"
        }</p>
          </div>
        `;

        const marker = new map.mapgl.HtmlMarker(map, {
          coordinates: [parseFloat(point.lon), parseFloat(point.lat)],
          type: "html",
          html: customMarker,
          icon: null,
          anchor: [0.5, 1],
        });

        customMarker.addEventListener("click", () => {
          if (index !== 0) {
            // Действия при клике на маркер (если нужно)
          }
        });

        return marker;
      });

      setMarkers(newMarkers);

      if (routePoints.length >= 2 && directions) {
        directions.carRoute({
          points: routePoints,
          style: styleRoutes,
        });
      }
    }
  }, [map, everyRoutes_TA, directions, mapGeo]);

  // useEffect(() => {
  //   if (map && listTA_RouteNoPlan?.length > 0) {
  //     if (secondRoute) {
  //       secondRoute.clear();
  //     }

  //     const routePointsNoPlan = listTA_RouteNoPlan.map((point) => [
  //       parseFloat(point.lon),
  //       parseFloat(point.lat),
  //     ]);

  //     const newDirectionsInstance = new Directions(map, {
  //       directionsApiKey: key,
  //     });

  //     setSecondRoute(newDirectionsInstance);

  //     // Создаем маркеры только для первой и последней точек маршрута
  //     const startPoint = routePointsNoPlan[0];
  //     const endPoint = routePointsNoPlan[routePointsNoPlan.length - 1];

  //     // Создаем и добавляем маркер для первой точки
  //     const startMarker = new map.mapgl.HtmlMarker(map, {
  //       coordinates: startPoint,
  //       type: "html",
  //       html: `<div class="customMarker__start">Старт</div>`,
  //       anchor: [0.5, 1],
  //     });

  //     // Создаем и добавляем маркер для последней точки
  //     const endMarker = new map.mapgl.HtmlMarker(map, {
  //       coordinates: endPoint,
  //       type: "html",
  //       html: `<div class="customMarker__end">Финиш</div>`,
  //       anchor: [0.5, 1],
  //     });

  //     // Добавляем маркеры на карту
  //     setMarkers((prev) => [...prev, startMarker, endMarker]);

  //     // Прокладываем маршрут только если есть хотя бы две точки
  //     if (routePointsNoPlan.length >= 2) {
  //       newDirectionsInstance.carRoute({
  //         points: routePointsNoPlan,
  //         style: styleRoutesNoPlan, // Используем стиль для фактического маршрута
  //       });
  //     }
  //   }
  // }, [map, listTA_RouteNoPlan]);

  const list_TA = transformLists(listTA, "guid", "fio");

  return (
    <div className="mapHistory">
      <div className="mapHistory__header">
        <div className="select">
          <Select
            options={list_TA}
            className="select"
            onChange={onChange}
            value={activeTA}
            name="activeTA"
          />
        </div>

        <div className="date">
          <DatePicker
            selected={reverseTransformActionDate(activeDate)}
            onChange={onChangeDate}
            yearDropdownItemNumber={100}
            placeholderText="ДД.ММ.ГГГГ"
            shouldCloseOnSelect={true}
            scrollableYearDropdown
            dateFormat="dd.MM.yyyy"
            locale={ru}
            maxDate={new Date()}
          />
        </div>

        <div className="infoRoute">
          <div>
            <div className="greenRoute">Посетил точку</div>
            <div className="redRoute">Не посетил</div>
          </div>
          <div>
            <div className="vialetRoute">
              Маршрут, по которому должен был ехать ТА
            </div>
            <div className="bluetoute">Маршрут, по которому ТА поехал</div>
          </div>
        </div>

        {/* <div className="distanceInfo">
          <p>Общее расстояние маршрута: {totalDistance.toFixed(2)} км</p>
        </div> */}
      </div>

      <div id="mapContainerHistory" className="map-container"></div>
      <MapMenuInfo totalDistance={totalDistance} />
    </div>
  );
};

export default MapHistory;

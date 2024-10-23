/////// hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////// maps
import { load } from "@2gis/mapgl";
import { Directions } from "@2gis/mapgl-directions";

////// helpers
import { styleRoutes } from "../../../helpers/objs";
import { myAlert } from "../../../helpers/MyAlert";

////// styles
import "./style.scss";

////// fns
import { setMapGeo } from "../../../store/reducers/mapSlice";
import { setActiveActions_TA } from "../../../store/reducers/mapSlice";

const MapWrapper = ({ searchMe }) => {
  const dispatch = useDispatch();
  const { mapGeo, everyRoutes_TA } = useSelector((state) => state.mapSlice);
  const { stateLoad } = useSelector((state) => state.mapSlice);
  const { key } = useSelector((state) => state.mapSlice);
  const { activeRouteList } = useSelector((state) => state.photoSlice);

  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    load().then((mapgl) => {
      const initializedMap = new mapgl.Map("mapContainerTA", {
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
  }, [key]);

  useEffect(() => {
    if (map && everyRoutes_TA?.length > 0) {
      markers.forEach((m) => m.destroy());
      setMarkers([]);

      if (directions) {
        directions.clear();
      }

      const routePoints = everyRoutes_TA?.map((point) => [
        parseFloat(point.lon),
        parseFloat(point.lat),
      ]);

      const newMarkers = everyRoutes_TA?.map((point, index) => {
        const customMarker = document.createElement("div");
        customMarker.className = "customMarker";
        customMarker.innerHTML = `${
          !!point?.myGeo
            ? "<div class='customMarker__inner'><i></i></div>"
            : `<div class='customMarker__point'><i></i></div>
            <div class='customMarker__name ${
              !!point?.sides ? "startEnd" : ""
            } ${!!point?.set_start_time ? "wasTA" : ""}'><p> ${
                !!!point?.sides
                  ? `<span class="customMarker__index">${index}. </span>`
                  : ""
              } ${point.point}</p></div>`
        }
        `;

        const marker = new map.mapgl.HtmlMarker(map, {
          coordinates: [parseFloat(point.lon), parseFloat(point.lat)],
          type: "html",
          html: customMarker,
          anchor: [0.5, 1],
        });

        customMarker.addEventListener("click", () => clickPoint(point));

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
  }, [map, everyRoutes_TA, directions]);

  const searchMeFN = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(setMapGeo({ latitude, longitude }));
          const userLocation = [longitude, latitude];
          if (map) {
            // Центрируем карту на геолокации пользователя
            map.setCenter(userLocation);
            map.setZoom(15); // Можно изменить масштаб карты
          } else {
            console.error("Map is not initialized yet.");
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (map && searchMe) {
      searchMeFN();
    }
  }, [map, searchMe]);

  const clickPoint = (point) => {
    const obj = { ...point, actionType: 1, activeRouteList };

    console.log(activeRouteList, "activeRouteList");

    if (activeRouteList?.status == 0) {
      myAlert("Начните свой маршрут!");
    }

    if (activeRouteList?.status == 2) {
      myAlert("Вы обошли все точки на сегодня!");
    }

    if (activeRouteList?.status == 1) {
      /// действия можно делать только когда маршрут стал активным
      //  модалка для  действий (сфотать, отпустить накладную и т.д.)
      dispatch(setActiveActions_TA(obj));
    }
  };

  return (
    <div className="mapBlock">
      <MapMain />
    </div>
  );
};

export default MapWrapper;

// Компонент для карты
const MapMain = React.memo(
  () => {
    return (
      <div id="mapContainerTA" style={{ width: "100%", height: "100%" }}></div>
    );
  },
  () => true
);

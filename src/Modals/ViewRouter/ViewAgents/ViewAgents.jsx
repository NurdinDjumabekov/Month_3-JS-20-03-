/////// hooks
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { load } from "@2gis/mapgl";

////// styles
import "./style.scss";

////// fns
import { getListTA } from "../../../store/reducers/mainSlice";
import { getAllRouteAgent } from "../../../store/reducers/mapSlice";

////// helpers
import { formatName } from "../../../helpers/searchActiveOrdersTA";

const ViewAgents = () => {
  const dispatch = useDispatch();

  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [isCheck, setIsCheck] = useState(false); // Флаг для проверки готовности карты

  const { invoiceInfo } = useSelector((state) => state.mainSlice);
  const { mapGeo, key, listRouteAllTA } = useSelector(
    (state) => state.mapSlice
  );

  useEffect(() => {
    let intervalId;
    const getRoute = () => dispatch(getAllRouteAgent());
    dispatch(getAllRouteAgent());

    if (invoiceInfo?.action === 6) {
      dispatch(getListTA({ first: true }));
      intervalId = setInterval(getRoute, 10000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [invoiceInfo?.action, dispatch]);

  useEffect(() => {
    let map;

    const loadMap = async () => {
      const mapgl = await load();
      map = new mapgl.Map("map-container-admin", {
        center: [mapGeo.longitude, mapGeo.latitude],
        zoom: 13,
        key,
      });
      mapRef.current = map;
      setIsCheck(true); // Устанавливаем флаг, что карта загружена
    };

    loadMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
      }
    };
  }, [mapGeo, key]);

  useEffect(() => {
    if (isCheck && listRouteAllTA.length > 0) {
      markers.forEach((marker) => marker?.destroy());

      const updateMarkers = () => {
        load().then((mapgl) => {
          const newMarkers = listRouteAllTA.map((item) => {
            const lat = parseFloat(item.lat);
            const lon = parseFloat(item.lon);
            const { agent } = item;
            if (lat && lon) {
              const customMarker = document.createElement("div");
              customMarker.className = "marker";
              customMarker.innerHTML = `
                <div class="marker__inner"><i></i></div>
                <div class="marker__name"><p>${formatName(agent)}</p></div>
              `;

              return new mapgl.HtmlMarker(mapRef.current, {
                coordinates: [lon, lat],
                html: customMarker,
                anchor: [0.5, 1],
              });
            }
            return null;
          });

          setMarkers(newMarkers.filter(Boolean));
        });
      };

      updateMarkers();
    }
  }, [isCheck, listRouteAllTA]);
  // Обновляю маркеры только после загрузки карты и данных

  return (
    <div className="viewAgents">
      <div className="mapAgents">
        <MapMain />
      </div>
    </div>
  );
};

export default ViewAgents;

const MapMain = React.memo(
  () => {
    return (
      <div
        id="map-container-admin"
        style={{ width: "100%", height: "100%" }}
      ></div>
    );
  },
  () => true
);

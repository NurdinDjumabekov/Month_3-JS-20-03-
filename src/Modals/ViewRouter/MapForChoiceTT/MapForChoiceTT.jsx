///// hooks
import React, { useEffect, useState } from "react";
import { load } from "@2gis/mapgl";
import { useDispatch, useSelector } from "react-redux";

//// style
import "./style.scss";

///// icons
import DeleteIcon from "../../../assets/MyIcons/DeleteIcon";
import AddIcon from "../../../assets/MyIcons/AddIcon";

////// fns
import { setActiveViewMap } from "../../../store/reducers/mapSlice";
import { editCoordsPoint } from "../../../store/reducers/mapSlice";

///// helpers
import { clearActiveMap } from "../../../helpers/clear";

const MapForChoiceTT = () => {
  const dispatch = useDispatch();

  const [map, setMap] = useState(null);
  const [mapglInstance, setMapglInstance] = useState(null); // Экземпляр mapgl
  const [markers, setMarkers] = useState([]);

  const { mapGeo, key, activeViewMap } = useSelector((state) => state.mapSlice);
  const { activeTA } = useSelector((state) => state.selectsSlice);

  useEffect(() => {
    load().then((mapgl) => {
      const initializedMap = new mapgl.Map("mapTT", {
        center: [
          mapGeo?.longitude || 74.5975735,
          mapGeo?.latitude || 42.8508686,
        ],
        zoom: 13,
        key,
      });

      setMap(initializedMap);
      setMapglInstance(mapgl);

      // Устанавливаем маркер, если есть координаты в activeViewMap
      if (activeViewMap?.lat && activeViewMap?.lon) {
        const customMarker = document.createElement("div");
        customMarker.className = "customMarker";
        customMarker.innerHTML = `
          <div class='customMarker__inner'><i></i></div>
          <div class='customMarker__name'><p>${activeViewMap?.point}</p></div>
        `;

        const marker = new mapgl.HtmlMarker(initializedMap, {
          coordinates: [activeViewMap.lon, activeViewMap.lat],
          html: customMarker,
          anchor: [0.5, 1],
        });
        setMarkers([marker]);
      }

      return () => {
        if (initializedMap) {
          initializedMap.destroy();
        }
      };
    });
  }, [key, mapGeo]);

  const clickPoint = (e) => {
    const coords = e.lngLat;

    // Удаляем предыдущие маркеры
    markers.forEach((m) => m.destroy());
    setMarkers([]);

    if (map && mapglInstance) {
      const customMarker = document.createElement("div");
      customMarker.className = "customMarker";
      customMarker.innerHTML = `
        <div class='customMarker__inner'><i></i></div>
        <div class='customMarker__name'><p>${activeViewMap?.point}</p></div>
      `;

      // Создаем новый маркер по клику
      const marker = new mapglInstance.HtmlMarker(map, {
        coordinates: coords,
        html: customMarker,
        anchor: [0.5, 1],
      });

      // Обновляем состояние в activeViewMap
      const obj = { ...activeViewMap, lat: coords[1], lon: coords[0] };
      dispatch(setActiveViewMap(obj));

      // Добавляем маркер в список
      setMarkers([marker]);
    }
  };

  const saveData = () => {
    if (activeViewMap?.lat && activeViewMap?.lon) {
      const send = {
        ...activeViewMap,
        name: "",
        address: "",
        phone: "",
        type_guid: "0",
        lat: activeViewMap?.lat,
        lon: activeViewMap?.lon,
        point_guid: activeViewMap?.point_guid,
        status: activeViewMap?.status,
        agent_guid: activeTA?.value,
      };
      dispatch(editCoordsPoint(send));
    }
  };

  const clearRoute = () => {
    // Сбрасываем состояние карты и удаляем маркеры
    dispatch(setActiveViewMap(clearActiveMap));
    markers.forEach((m) => m.destroy());
    setMarkers([]);
  };

  useEffect(() => {
    if (map) {
      map.on("click", clickPoint);
    }

    return () => {
      if (map) {
        map.off("click", clickPoint);
      }
    };
  }, [map, markers, mapglInstance]);

  return (
    <div className="mapForChoiceTT">
      <div id="mapTT" style={{ width: "100%", height: "500px" }}></div>
      <div className="mapForChoiceTT__actions">
        <button onClick={clearRoute} className="clearMapBtn">
          {/* <DeleteIcon width={19} height={19} color={"#fff"} /> */}
          <p>Закрыть</p>
        </button>
        <button onClick={saveData} className="saveCoords">
          {/* <AddIcon width={16} height={16} color={"#fff"} /> */}
          <p>Сохранить</p>
        </button>
      </div>
    </div>
  );
};

export default MapForChoiceTT;

import React, { useEffect, useRef, useState } from "react";
import { load } from "@2gis/mapgl";
import { useDispatch, useSelector } from "react-redux";
import { getAddres } from "../../store/reducers/pointsSlice";
import ModalAddPoints from "../../Modals/AddPointsPage/ModalAddPoints/ModalAddPoints";

const AddPointsPage = () => {
  const dispatch = useDispatch();
  const mapRef = useRef(null); // Ref для хранения экземпляра карты
  const [selectedIds, setSelectedIds] = useState([]);
  const { mapGeo, key } = useSelector((state) => state.mapSlice);
  const { infoNewPoint } = useSelector((state) => state.pointsSlice);

  useEffect(() => {
    // Загружаем карту только один раз
    if (!mapRef.current) {
      load().then((mapgl) => {
        mapRef.current = new mapgl.Map("mapContainer", {
          center: [
            mapGeo?.longitude || 74.6283202,
            mapGeo?.latitude || 42.8540827,
          ],
          zoom: 18,
          key,
        });

        // Установка обработчика клика на карту
        mapRef.current.on("click", handleMapClick);
      });
    }

    // Очистка карты при размонтировании компонента
    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, [key]);

  const handleMapClick = (e) => {
    if (!e.target) return;
    const id = e.target?.id;

    const lat = e?.lngLat?.[0];
    const lon = e?.lngLat?.[1];
    dispatch(getAddres({ ...infoNewPoint, lat, lon, codeid: id }));

    setSelectedIds((prev) => {
      const newSelectedIds = prev?.includes(id)
        ? prev?.filter((i) => i !== id)
        : [id];

      mapRef.current?.setSelectedObjects(newSelectedIds);
      return newSelectedIds;
    });
  };

  return (
    <>
      <div id="mapContainer" style={{ width: "100%", height: "100vh" }} />
      <ModalAddPoints />
      {/* //// добавление точки от имени ТА (регистрация тоски) */}
    </>
  );
};

export default AddPointsPage;

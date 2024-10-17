import React, { useEffect, useState } from "react";
import { load } from "@2gis/mapgl";
import { useSelector } from "react-redux";
import { Directions } from "@2gis/mapgl-directions";

import "./style.scss";

////// helpers
import { styleRoutes } from "../../../helpers/objs";

const MapForChoicePoints = () => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [markers, setMarkers] = useState([]);

  const { mapGeo, key, activeViewMap } = useSelector((state) => state.mapSlice);

  useEffect(() => {
    load().then((mapgl) => {
      const initializedMap = new mapgl.Map("mapContainerChoice", {
        center: [
          mapGeo?.longitude || 74.5975735,
          mapGeo?.latitude || 42.8508686,
        ],
        zoom: 13,
        key,
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
    if (map && activeViewMap?.listRoute?.length > 0) {
      markers.forEach((m) => m.destroy());
      setMarkers([]);

      if (directions) {
        directions.clear();
      }

      const routePoints = activeViewMap?.listRoute?.map((point) => [
        point.lon,
        point.lat,
      ]);

      const newMarkers = activeViewMap?.listRoute?.map((point, index) => {
        const customMarker = document.createElement("div");
        customMarker.className = "customMarker";
        customMarker.innerHTML = `
          <div class='customMarker__inner'><i></i></div>
          <div class='customMarker__name'><p><span class='customMarker__index'>${
            index + 1
          }</span>. ${point.point}</p></div>
        `;

        const marker = new map.mapgl.HtmlMarker(map, {
          coordinates: [point.lon, point.lat],
          html: customMarker,
          anchor: [0.5, 1],
        });

        customMarker.addEventListener("click", () => {
          console.log(point, "point");
          alert(`Marker clicked: ${point.point}`);
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
  }, [map, activeViewMap, directions]);

  return (
    <>
      <div className="mapForChoicePoints">
        <div id="mapContainerChoice" className="map-container"></div>
      </div>
    </>
  );
};

export default MapForChoicePoints;

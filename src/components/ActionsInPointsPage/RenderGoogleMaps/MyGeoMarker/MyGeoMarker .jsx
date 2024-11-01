import React, { useState } from "react";
import { Marker } from "@react-google-maps/api";
import iconMap from "../../../../assets/images/map.png";
import "./style.scss";

const MyGeoMarker = ({ position }) => {
  return (
    <>
      <Marker
        position={position}
        icon={{
          url: iconMap,
          scaledSize: new window.google.maps.Size(23, 35),
        }}
        label={{ text: " ", className: "myGeoIcon" }}
      ></Marker>
    </>
  );
};

export default MyGeoMarker;

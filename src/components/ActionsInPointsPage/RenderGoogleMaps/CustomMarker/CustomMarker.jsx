/////// hooks
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/////// components
import { Marker } from "@react-google-maps/api";

////// icons
import iconMap from "../../../../assets/images/map.png";

///// style
import "./style.scss";
import { myAlert } from "../../../../helpers/MyAlert";

///// fns

const CustomMarker = ({ position, index, setCenter, setZoom }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refIcon = useRef(null);

  const clickPoint = async () => {
    const { lat, lng } = position;

    if (!!position?.guid) {
      navigate("/points/history", { state: position });
    } else {
      const text =
        "С этого места вы начали путь, нажмите на маркер точки чтобы посмотреть подробную информацию";
      myAlert(text);
      setCenter({ lat, lng });
      setZoom(20);
    }
  };

  return (
    <div onClick={clickPoint} className="nurdin">
      <Marker
        ref={refIcon}
        position={position}
        icon={{
          url: iconMap,
          scaledSize: new window.google.maps.Size(19, 30),
        }}
        onClick={clickPoint}
        label={{
          text: `${index + 1}. ${position?.point}`,
          className: `textMaps ${
            !!position?.set_start_time ? "visitMap" : "no_visit_map"
          }`,
          fontWeight: "600",
          fontSize: "10px",
          clickable: true,
          cursor: "pointer",
          color: "#fff",
        }}
      />
    </div>
  );
};

export default CustomMarker;

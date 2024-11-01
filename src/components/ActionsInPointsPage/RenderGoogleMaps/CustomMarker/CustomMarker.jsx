/////// hooks
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Marker } from "@react-google-maps/api";

////// icons
import iconMap from "../../../../assets/images/map.png";

///// style
import "./style.scss";
import {
  activeSlideFN,
  createInvoice,
} from "../../../../store/reducers/standartSlice";

const CustomMarker = ({ position, index, setCenter, setZoom }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { dataSave } = useSelector((state) => state.saveDataSlice);

  const clickPoint = async () => {
    const { lat, lng } = position;
    setCenter({ lat, lng });
    setZoom(20);
    if (!!position?.guid) {
      //// создание накладной возврата
      const send = {
        sender_guid: dataSave?.guid, // guid отпровителя
        sender_type: 1,
        reciever_guid: position?.point_guid, // guid получателя
        reciever_type: 4, // для тт
        user_guid: dataSave?.guid, // guid человека кто создает
        user_type: 1,
        comment: "Возврат накладной",
        invoice_type: 4, // накладная возврата
        route_guid: position?.guid,
      };

      const returns = await dispatch(createInvoice(send)).unwrap();
      if (!!returns?.result) {
        //// создание отпускной возврата
        const data = {
          sender_guid: dataSave?.guid, // guid отпровителя
          sender_type: 1,
          reciever_guid: position?.point_guid, // guid получателя
          reciever_type: 4, // для тт
          user_guid: dataSave?.guid, // guid человека кто создает
          user_type: 1,
        };

        const res = await dispatch(createInvoice(data)).unwrap();

        if (!!res?.result) {
          const return_guid = returns?.invoice_guid;
          const send_guid = res?.invoice_guid;
          const sendData = { ...position, return_guid, send_guid };
          dispatch(activeSlideFN()); /// обнуляю слайдер, чтобы отображался самый первый
          navigate("/points/actions", { state: sendData });
        }
      }
    }
  };

  const refIcon = useRef(null);

  const cehck = true ? "#fff" : "#222";

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
          className: "textMaps",
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

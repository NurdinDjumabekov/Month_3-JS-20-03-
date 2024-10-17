/////// hooks
import React from "react";

/////// style
import "./style.scss";

/////// fns
import EveryDataHour from "./EveryDataHour";
import EveryDataDay from "./EveryDataDay";

const EveryDateInfo = ({ content }) => {
  const { allDay } = content?.event?._def;

  return (
    <>
      {allDay ? (
        <EveryDataDay content={content} />
      ) : (
        <EveryDataHour content={content} />
      )}
    </>
  );
};

export default EveryDateInfo;

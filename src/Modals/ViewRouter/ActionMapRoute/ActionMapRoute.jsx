////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import Modals from "../../../components/Modals/Modals";
import MapForChoicePoints from "../MapForChoicePoints/MapForChoicePoints";
import MapForChoiceTT from "../MapForChoiceTT/MapForChoiceTT";

////// fns
import { setActiveViewMap } from "../../../store/reducers/mapSlice";

////// style
import "./style.scss";

////// helpers
import { clearActiveMap } from "../../../helpers/clear";

const ActionMapRoute = () => {
  const dispatch = useDispatch();

  const { activeViewMap } = useSelector((state) => state.mapSlice);

  const closeModal = () => dispatch(setActiveViewMap(clearActiveMap));

  const obj = { 1: <MapForChoiceTT />, 2: <MapForChoicePoints /> };

  return (
    <div className={!!activeViewMap?.guid ? "actionMapRoute" : ""}>
      <Modals
        openModal={!!activeViewMap?.guid}
        closeModal={closeModal}
        title={""}
      >
        {obj?.[activeViewMap?.actionType]}
      </Modals>
    </div>
  );
};

export default ActionMapRoute;

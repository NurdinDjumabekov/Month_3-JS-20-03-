////// hooks
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import SendInput from "../../../common/SendInput/SendInput";
import Modals from "../../../components/Modals/Modals";
import Select from "react-select";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

///// helpers
import { myAlert } from "../../../helpers/MyAlert";
import { transformLists } from "../../../helpers/transformLists";

////// fns
import {
  clearEveryListRouteCRUD,
  clearRouteCRUD,
  everyRouteCRUD,
  ListRouteCRUD,
  setEveryListRouteCRUD,
  setRouteCRUD,
} from "../../../store/reducers/mapSlice";

////// style
import "./style.scss";
import {
  extractTimeFromDateTime,
  reverseTransformActionTime,
  transformDateTime,
} from "../../../helpers/transformDate";

const ActionsListRoute = () => {
  const dispatch = useDispatch();

  const { listTA } = useSelector((state) => state.mainSlice);
  const { routeCRUD, listPointsEveryTA, activeRoute } = useSelector(
    (state) => state.mapSlice
  );
  const { dataSave } = useSelector((state) => state.saveDataSlice);
  const { activeTA } = useSelector((state) => state.selectsSlice);

  const objAction = { 1: "+ Добавить", 2: "Редактировать", 3: "Удалить" };
  const objTitle = { 1: "Добавить маршрут", 2: "Редактировать", 3: "Удалить" };

  /////// CRUD список маршрутов за весь месяц (1-30)
  const onChange = (e, type) => {
    if (!!type) {
      dispatch(setRouteCRUD({ ...routeCRUD, agent_select: e }));
    } else {
      const obj = { ...routeCRUD, [e.target.name]: e.target.value };
      dispatch(setRouteCRUD(obj));
    }
  };

  const createRouteFN = () => {
    if (!!!routeCRUD?.agent_select?.value) {
      myAlert("Выберите торгового агента!", "error");
      return;
    }
    if (!!!routeCRUD?.number) {
      myAlert("Задайте номер маршруту!", "error");
      return;
    }

    const data = {
      ...routeCRUD,
      ...dataSave,
      agent_guid: routeCRUD?.agent_select?.value,
      activeTA,
    };
    if (routeCRUD?.actionType == 1) {
      //// создание
      dispatch(ListRouteCRUD(data));
    } else if (routeCRUD?.actionType == 2) {
      //// редактирование
      dispatch(ListRouteCRUD({ ...data, route_sheet_guid: routeCRUD?.guid }));
    }
  };

  const list_TA = transformLists(listTA, "guid", "fio");

  /////// CRUD список маршрутов за определенный день
  const { everyListRouteCRUD } = useSelector((state) => state.mapSlice);

  const list_TT = transformLists(listPointsEveryTA, "guid", "text");

  const closeModalTwo = () => dispatch(clearEveryListRouteCRUD());

  const onChangeTwo = (e, type, date) => {
    if (!!type && !!!date) {
      const obj = { ...everyListRouteCRUD, seller_select: e };
      dispatch(setEveryListRouteCRUD(obj));
    } else if (!!type && !!date) {
      const obj = { ...everyListRouteCRUD, [type]: transformDateTime(e) };
      dispatch(setEveryListRouteCRUD(obj));
    } else {
      const obj = { ...everyListRouteCRUD, [e.target.name]: e.target.value };
      dispatch(setEveryListRouteCRUD(obj));
    }
  };

  const createEveryRouteFN = () => {
    if (!!!everyListRouteCRUD?.seller_select?.value) {
      myAlert("Выберите торговую точку!", "error");
      return;
    }
    if (!!!everyListRouteCRUD?.ordering) {
      myAlert("Задайте позицию маршруту!", "error");
      return;
    }

    const data = {
      ...everyListRouteCRUD,
      point_guid: everyListRouteCRUD?.seller_select?.value,
      /// 2024-09-26 14:36 ====> 14:36
      end_time: extractTimeFromDateTime(everyListRouteCRUD?.end_time),
      start_time: extractTimeFromDateTime(everyListRouteCRUD?.start_time),
      route_sheet_guid: activeRoute?.guid,
    };

    if (everyListRouteCRUD?.actionType == 1) {
      //// создание
      dispatch(everyRouteCRUD(data));
    } else if (everyListRouteCRUD?.actionType == 2) {
      //// редактирование
      dispatch(everyRouteCRUD({ ...data }));
    }
  };

  const startDate = reverseTransformActionTime(everyListRouteCRUD?.start_time);
  const endDate = reverseTransformActionTime(everyListRouteCRUD?.end_time);

  const closeModal = () => dispatch(clearRouteCRUD());

  return (
    <>
      {/* //// CRUD список маршрутов за весь месяц (1-30) */}
      <Modals
        openModal={!!routeCRUD?.actionType}
        closeModal={closeModal}
        title={objTitle?.[routeCRUD?.actionType]}
      >
        <div className="createRoute">
          <div className="inputSend">
            <p>Торговый агент</p>
            <Select
              options={list_TA}
              className="select"
              onChange={(item) => onChange(item, "sel")}
              value={routeCRUD?.agent_select}
            />
          </div>

          <SendInput
            value={routeCRUD?.number}
            onChange={onChange}
            title={"Номер маршрута"}
            name={"number"}
            type="number"
          />

          <SendInput
            value={routeCRUD?.comment}
            onChange={onChange}
            title={"Комментарий"}
            name={"comment"}
          />

          <div className="sendBlock">
            <button className="sendData" onClick={createRouteFN}>
              {objAction?.[routeCRUD?.actionType]}
            </button>
          </div>
        </div>
      </Modals>

      {/* /////// CRUD список маршрутов за определенный день */}
      <Modals
        openModal={!!everyListRouteCRUD?.actionType}
        closeModal={closeModalTwo}
        title={objTitle?.[everyListRouteCRUD?.actionType]}
      >
        <div className="createRoute">
          <div className="inputSend">
            <p>Торговая точка</p>
            <Select
              options={list_TT}
              className="select"
              onChange={(item) => onChangeTwo(item, "sel")}
              value={everyListRouteCRUD?.seller_select}
            />
          </div>

          <SendInput
            value={everyListRouteCRUD?.ordering}
            onChange={onChangeTwo}
            title={"Позиция маршрута"}
            name={"ordering"}
            type="number"
          />

          {/* <SendInput
            value={everyListRouteCRUD?.comment}
            onChange={onChangeTwo}
            title={"Комментарий"}
            name={"comment"}
          /> */}

          <div className="inputSend time">
            <p>Выберите прихода:</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => onChangeTwo(date, "start_time", "date")}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={10}
              timeCaption="Время"
              dateFormat="HH:mm"
              timeFormat="HH:mm"
            />
          </div>
          <div className="inputSend time">
            <p>Выберите ухода:</p>
            <DatePicker
              selected={endDate}
              onChange={(date) => onChangeTwo(date, "end_time", "date")}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={10}
              timeCaption="Время"
              dateFormat="HH:mm"
              timeFormat="HH:mm"
            />
          </div>

          <div className="sendBlock">
            <button className="sendData" onClick={createEveryRouteFN}>
              {objAction?.[everyListRouteCRUD?.actionType]}
            </button>
          </div>
        </div>
      </Modals>
    </>
  );
};

export default ActionsListRoute;

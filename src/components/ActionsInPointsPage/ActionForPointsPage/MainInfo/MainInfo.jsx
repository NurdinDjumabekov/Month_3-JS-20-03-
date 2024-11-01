////// hooks
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

const MainInfo = ({ reportEveryTT }) => {
  return (
    <div className="mainInfo">
      <div className="mainInfo__inner">
        <div className="info">
          <p>Дата: </p>
          <span>01.11.2024</span>
        </div>
        <div className="info">
          <p>Контрагент: </p>
          <span>Джумабеков Нурдин</span>
        </div>
        <div className="info">
          <p>Долг точки: </p>
          <span>{reportEveryTT?.tt_oplata}</span>
        </div>

        <div className="info">
          <p>Сумма реализации: </p>
          <span>{reportEveryTT?.tt_prinat_price} сом</span>
        </div>

        <div className="info">
          <p>Сумма возврата: </p>
          <span>{reportEveryTT?.tt_vozvrat_price} сом</span>
        </div>

        <div className="info">
          <p>Сумма оплаты: </p>
          <span>{reportEveryTT?.tt_oplata} сом</span>
        </div>

        <div className="info">
          <p>Вес возврата: </p>
          <span>{reportEveryTT?.tt_vozvrat_price} кг</span>
        </div>

        <div className="info">
          <p>Вес реализации: </p>
          <span>{reportEveryTT?.tt_prinat_count_kg} кг</span>
        </div>

        <div className="info">
          <p>Результат посещения: </p>
          <span>{reportEveryTT?.result || "Не посетил точку"}</span>
        </div>

        <div className="info">
          <p>Время посещения: </p>
          <span>{reportEveryTT?.start_time || "..."}</span>
        </div>

        <div className="info">
          <p>Завершение сеанса: </p>
          <span>{reportEveryTT?.end_time || "..."}</span>
        </div>
      </div>

      <button className="startEndTA">
        {true ? <p>Завершить сеанс</p> : <p>Завершить сеанс</p>}
      </button>
    </div>
  );
};

export default MainInfo;

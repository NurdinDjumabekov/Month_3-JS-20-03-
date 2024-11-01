////// hooks
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

const MainInfo = () => {
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
          <span>01.11.2024</span>
        </div>

        <div className="info">
          <p>Сумма реализации: </p>
          <span>5000 сом</span>
        </div>

        <div className="info">
          <p>Сумма возврата: </p>
          <span>2342 сом</span>
        </div>

        <div className="info">
          <p>Сумма оплаты: </p>
          <span>2000 сом</span>
        </div>

        <div className="info">
          <p>Вес возврата: </p>
          <span>10 кг</span>
        </div>

        <div className="info">
          <p>Вес реализации: </p>
          <span>200 кг</span>
        </div>

        <div className="info">
          <p>Результат посещения: </p>
          <span>Успешный</span>
        </div>

        <div className="info">
          <p>Время посещения: </p>
          <span>19:00</span>
        </div>

        <div className="info">
          <p>Завершение сеанса: </p>
          <span>20:00</span>
        </div>
      </div>

      <button className="startEndTA">
        {true ? <p>Завершить сеанс</p> : <p>Завершить сеанс</p>}
      </button>
    </div>
  );
};

export default MainInfo;

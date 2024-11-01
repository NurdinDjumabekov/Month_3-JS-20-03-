////// hooks
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// components

////// style
import "./style.scss";

////// helpers
import { roundingNum } from "../../../../helpers/totals";

const PayInfo = ({ props, inviceData }) => {
  const { point } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total_price_send = +inviceData?.send?.total_price || 0;
  const total_price_return = +inviceData?.return?.total_price || 0;

  const dotyPoint = 1000;

  const withoutDoty = total_price_send - total_price_return;

  const withDoty = total_price_send - total_price_return + dotyPoint;

  const createPay = () => {
    const obj = {
      action: 1,
      date_from: "",
      date_to: "",
      invoice_guid: "",
      point,
    };
    navigate("/points/pay", { state: obj });
  };

  return (
    <div className="mainInfo rerurnProd">
      <div className="mainInfo__inner">
        <div className="info">
          <p>Долг точки: </p>
          <span>{roundingNum(dotyPoint)} сом</span>
        </div>
        <div className="info">
          <p>Остаток на начало: </p>
          <span>{roundingNum(0)} сом</span>
        </div>
        <div className="info">
          <p>Приход: </p>
          <span>{roundingNum(total_price_send)} сом</span>
        </div>
        <div className="info">
          <p>Возврат: </p>
          <span>{roundingNum(total_price_return)} сом</span>
        </div>
        <div className="info">
          <p>К оплате без долга: </p>
          <span>{roundingNum(withoutDoty)} сом</span>
        </div>
        <div className="info">
          <p>Итого к оплате: </p>
          <span>{roundingNum(withDoty)} сом</span>
        </div>
        <div className="info">
          <p>Оплачено: </p>
          <span>{roundingNum(0)} сом</span>
        </div>
      </div>
      <button className="startEndTA" onClick={createPay}>
        <p>+ Произвести оплату</p>
      </button>
    </div>
  );
};

export default PayInfo;

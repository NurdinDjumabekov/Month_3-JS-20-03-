////// hooks
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// components

////// style
import "./style.scss";

////// helpers
import { roundingNum } from "../../../../helpers/totals";

const PayInfo = ({ props, inviceData, getDataVisit, reportEveryTT }) => {
  const { point, point_guid, date } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { reportPayEveryTT } = useSelector((state) => state.standartSlice);

  const createPay = () => {
    const obj = {
      ...props,
      invoice_guid: "",
      paid: reportPayEveryTT?.paid, /// оплачено
      tt_dolg: reportPayEveryTT?.tt_dolg, /// долг
      total_to_pay: reportPayEveryTT?.total_to_pay, /// итого к оплате
      sum_return: reportEveryTT?.tt_vozvrat_price,
      sum_accept: reportEveryTT?.tt_prinat_price,
    };
    navigate("/points/pay", { state: obj });
  };

  return (
    <div className="mainInfo rerurnProd">
      <div className="mainInfo__inner">
        <div className="info">
          <p>Долг точки: </p>
          <span>{roundingNum(+reportPayEveryTT?.tt_dolg)} сом</span>
        </div>
        <div className="info">
          <p>Остаток на начало: </p>
          <span>{roundingNum(+reportPayEveryTT?.start_balance)} сом</span>
        </div>
        <div className="info">
          <p>Приход: </p>
          <span>{roundingNum(+reportPayEveryTT?.tt_prihod)} сом</span>
        </div>
        <div className="info">
          <p>Возврат: </p>
          <span>{roundingNum(+reportPayEveryTT?.tt_vozvrat)} сом</span>
        </div>
        <div className="info">
          <p>К оплате без долга: </p>
          <span>{roundingNum(+reportPayEveryTT?.payment_no_debt)} сом</span>
        </div>
        <div className="info">
          <p>Итого к оплате: </p>
          <span>{roundingNum(+reportPayEveryTT?.total_to_pay)} сом</span>
        </div>
        <div className="info">
          <p>Оплачено: </p>
          <span>{roundingNum(+reportPayEveryTT?.paid)} сом</span>
        </div>
      </div>
      <button className="startEndTA" onClick={createPay}>
        <p>+ Произвести оплату</p>
      </button>
    </div>
  );
};

export default PayInfo;

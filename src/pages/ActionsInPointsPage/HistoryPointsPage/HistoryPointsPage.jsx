/////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";

////// style
import "./style.scss";

////// fns
import { getListVisitPoints } from "../../../store/reducers/standartSlice";
import { createInvoice } from "../../../store/reducers/standartSlice";
import { activeSlideFN } from "../../../store/reducers/standartSlice";

const HistoryPointsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { guid, point, balance, seller_fio, date } = location.state;
  const { dataSave } = useSelector((state) => state.saveDataSlice);
  const { listRouteVisit } = useSelector((state) => state.standartSlice);

  // console.log(location.state);
  //   console.log(listRouteVisit, "listRouteVisit");

  useEffect(() => {
    dispatch(getListVisitPoints(guid));
  }, [guid]);

  const clickPoint = async (position) => {
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
      //// создание отпускной накладной
      const data = {
        sender_guid: dataSave?.guid, // guid отпровителя
        sender_type: 1,
        reciever_guid: position?.point_guid, // guid получателя
        reciever_type: 4, // для тт
        user_guid: dataSave?.guid, // guid человека кто создает
        user_type: 1,
        route_guid: position?.guid,
      };

      const res = await dispatch(createInvoice(data)).unwrap();
      if (!!res?.result) {
        const return_guid = returns?.invoice_guid;
        const send_guid = res?.invoice_guid;
        const sendData = { ...position, return_guid, send_guid };
        dispatch(activeSlideFN(0)); /// обнуляю слайдер, чтобы отображался самый первый
        navigate("/points/actions", { state: sendData });
      }
    }
  };

  return (
    <div className="historyPoints">
      <NavMenu navText={point} />
      <div className="historyPoints__inner">
        {listRouteVisit?.map((item, index) => (
          <div className="every" onClick={() => clickPoint(item)} key={index}>
            <div className="info">
              <p>Дата: </p>
              <span>{item?.date || "..."}</span>
            </div>
            <div className="info">
              <p>Долг точки: </p>
              <span>{item?.tt_oplata || 0} сом</span>
            </div>

            <div className="info">
              <p>Сумма реализации: </p>
              <span>{item?.tt_prinat_price || 0} сом</span>
            </div>

            <div className="info">
              <p>Сумма возврата: </p>
              <span>{item?.tt_vozvrat_price || 0} сом</span>
            </div>

            <div className="info">
              <p>Сумма оплаты: </p>
              <span>{item?.tt_oplata || 0} сом</span>
            </div>

            <div className="info">
              <p>Результат посещения: </p>
              <span>{item?.result || "Не посетил точку"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPointsPage;

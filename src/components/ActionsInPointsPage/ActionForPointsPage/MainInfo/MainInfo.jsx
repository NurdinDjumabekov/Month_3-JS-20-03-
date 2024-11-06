////// hooks
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

////// helpers
import { roundingNum } from "../../../../helpers/totals";
import { myAlert } from "../../../../helpers/MyAlert";

////// fns
import { actionMyVisitPoints } from "../../../../store/reducers/standartSlice";

////// components
import { BottomSheet } from "react-spring-bottom-sheet";

////// icons
import ArrowNav from "@mui/icons-material/ArrowForwardIosSharp";

const MainInfo = (props) => {
  const { reportEveryTT, getDataVisit, guid, point, position } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listTypesVisit } = useSelector((state) => state.standartSlice);

  const [look, setLook] = useState(false);

  const startVisitFN = async () => {
    //// наичнаю работу в этой точке
    const send = {
      route_guid: guid,
      comment: `Начал работу в точке ${point}`,
      result_guid: "",
      // result_guid: "CFFA5F82-882F-4C8D-B77C-DBC2E6FF0F2F",
      status: 1,
    };
    const res = await dispatch(actionMyVisitPoints(send)).unwrap();

    if (!!res?.result) {
      getDataVisit();
      myAlert(`Вы пришли на точку ${point}`);
    } else {
      myAlert("Ошибка, попробуйте позже", "error");
    }
  };

  const endVisitFN = async (item) => {
    //// конец работу в этой точке
    const send = {
      route_guid: guid,
      comment: `Закончили работу в точке ${point}`,
      result_guid: item?.guid,
      status: 2,
    };
    const res = await dispatch(actionMyVisitPoints(send)).unwrap();

    if (!!res?.result) {
      getDataVisit();
      setLook(false);
      navigate("/points/history", { state: position });
      myAlert(`Вы закончили работу в точке ${point}`);
    } else {
      myAlert("Ошибка, попробуйте позже", "error");
    }
  };

  return (
    <>
      <div className="mainInfo">
        <div className="mainInfo__inner">
          <div className="info">
            <p>Дата: </p>
            <span>{reportEveryTT?.date || "..."}</span>
          </div>

          <div className="info">
            <p>Контрагент: </p>
            <span>{reportEveryTT?.fio_contragent || "..."}</span>
          </div>

          <div className="info">
            <p>Долг точки: </p>
            <span>{roundingNum(reportEveryTT?.tt_oplata || 0)} сом</span>
          </div>

          <div className="info">
            <p>Сумма реализации: </p>
            <span>{roundingNum(reportEveryTT?.tt_prinat_price || 0)} сом</span>
          </div>

          <div className="info">
            <p>Сумма возврата: </p>
            <span>{roundingNum(reportEveryTT?.tt_vozvrat_price || 0)} сом</span>
          </div>

          <div className="info">
            <p>Сумма оплаты: </p>
            <span>{roundingNum(reportEveryTT?.tt_oplata || 0)} сом</span>
          </div>

          <div className="info">
            <p>Вес возврата: </p>
            <span>
              {roundingNum(reportEveryTT?.tt_vozvrat_count_kg || 0)} кг
            </span>
          </div>

          <div className="info">
            <p>Вес реализации: </p>
            <span>
              {roundingNum(reportEveryTT?.tt_prinat_count_kg || 0)} кг
            </span>
          </div>

          <div className="info">
            <p>Результат посещения: </p>
            <span>{reportEveryTT?.result || "..."}</span>
          </div>

          <div className="info">
            <p>Время посещения: </p>
            <span>{reportEveryTT?.start_time || "..."}</span>
          </div>

          <div className="info">
            <p>Завершение сеанса: </p>
            <span>{reportEveryTT?.end_time || "..."}</span>
          </div>

          {!!reportEveryTT?.start_time ? (
            <>
              {!!reportEveryTT?.end_time ? (
                ""
              ) : (
                <button className="startEndTA" onClick={() => setLook(true)}>
                  <p>+ Завершить посещение</p>
                </button>
              )}
            </>
          ) : (
            <button className="startEndTA" onClick={startVisitFN}>
              <p>+ Начать выгрузку</p>
            </button>
          )}
        </div>
      </div>
      <BottomSheet
        open={look}
        onDismiss={() => setLook(false)}
        defaultSnap={({ maxHeight }) => maxHeight * 0.7}
        snapPoints={({ maxHeight }) => maxHeight * 0.7}
      >
        <div className="typesComment">
          {listTypesVisit?.map((i, ind) => (
            <div onClick={() => endVisitFN(i)} key={ind}>
              <p>{i?.name}</p>
              <ArrowNav sx={{ color: "#5276ecc7" }} />
            </div>
          ))}
        </div>
      </BottomSheet>
    </>
  );
};

export default MainInfo;

/////// hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// fns
import {
  clearDataPay,
  getEveryDebt,
  sendPayFN,
  setDataPay,
} from "../../store/reducers/paySlice";
import {
  getWorkPlanEveryTA,
  setListWorkPlan,
} from "../../store/reducers/mainSlice";

////// components
import SendInput from "../../common/SendInput/SendInput";
import Modals from "../../components/Modals/Modals";

////// style
import "./style.scss";

////// icons
import PaymentsIcon from "@mui/icons-material/Payments";

import CreditScoreIcon from "@mui/icons-material/CreditScore";
import NavMenu from "../../common/NavMenu/NavMenu";
import AddPayPoint from "../../components/SettingsPage/AddPayPoint";
import { getPointsRouteAgent } from "../../store/reducers/mapSlice";

const SettingsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [viewApp, setViewApp] = useState(false);

  const { guid } = useSelector((state) => state.saveDataSlice?.dataSave);
  const { debtEveryTA, dataPay } = useSelector((state) => state.paySlice);

  useEffect(() => {
    dispatch(getWorkPlanEveryTA({ guid }));
    dispatch(getEveryDebt({ agent_guid: guid }));
    // dispatch(
    //   setListWorkPlan([
    //     { name: "Осталось выполнить", value: 95 },
    //     { name: "Выполнено", value: 5 },
    //   ])
    // ); //// check
    dispatch(clearDataPay()); /// clear поля ввода данных для оплаты
    dispatch(getPointsRouteAgent({ guid, first: false }));
  }, []);

  const length = debtEveryTA?.vozvrat?.length == 0;

  const listNav = [
    {
      text: "Оплатить в кассу",
      icon: <CreditScoreIcon sx={{ width: 20, height: 20 }} />,
      color: "#4361ee",
    },
    {
      text: "Принять у ТТ",
      icon: <PaymentsIcon sx={{ width: 20, height: 20 }} />,
      color: "#805dca",
    },
  ];

  const clickPay = async (id) => {
    if (id == 1) dispatch(setDataPay({ ...dataPay, user_guid: guid }));
    if (id == 2) {
      setViewApp(true);
      const data = await dispatch(
        getPointsRouteAgent({ guid, first: false })
      ).unwrap();
      const point = { value: data?.[0]?.guid, label: data?.[0]?.text };
      dispatch(setDataPay({ ...dataPay, point }));
    }
  };

  console.log(debtEveryTA, "debtEveryTA");

  return (
    <>
      <NavMenu navText={"Оплаты"} />
      <div className="settingsPage">
        <div className="navAction invoices">
          {listNav?.map((item, index) => (
            <button
              style={{ background: item?.color }}
              onClick={() => clickPay(index + 1)}
            >
              {item?.icon}
              <p>{item?.text}</p>
            </button>
          ))}
        </div>

        <div className="payCredit">
          {length ? (
            <div className="emptyDataInner">
              <p>Список пустой</p>
            </div>
          ) : (
            <div className="payCredit__list">
              {debtEveryTA?.vozvrat?.map((item) => (
                <div>
                  <div className="mainData">
                    <p>{item?.date}</p>
                    <span>{item?.comment || "..."}</span>
                  </div>
                  <div className="status">
                    <p>Успешно</p>
                    <p>{item?.amount} сом</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* <GraphicsEveryTA /> */}
      </div>
      <AddPayPoint viewApp={viewApp} setViewApp={setViewApp} />
    </>
  );
};

export default SettingsPage;

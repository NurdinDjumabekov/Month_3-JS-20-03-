////hooks
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

/////// fns
import { getListHistoryPayTAinWH } from "../../../store/reducers/paySlice";

/////// components
import NavMenu from "../../../common/NavMenu/NavMenu";
import PayKassaReport from "../../../components/Pdfs/PayKassaReport/PayKassaReport";

////// style
import "./style.scss";

////// icons
import FileOpenIcon from "@mui/icons-material/FileOpen";

////// helpers
import { statusPay } from "../../../helpers/objs";

const HistoryPayPage = () => {
  const dispatch = useDispatch();

  const [pdf, setPdf] = useState({});

  const { listHistoryPaysInWH } = useSelector((state) => state.paySlice);
  const { dataSave } = useSelector((state) => state.saveDataSlice);

  useEffect(() => {
    dispatch(getListHistoryPayTAinWH(dataSave?.guid));
  }, []);

  const length = listHistoryPaysInWH?.length == 0;

  console.log(pdf, "pdfa");

  return (
    <>
      <NavMenu navText={"История платежей в кассу"} />
      <div className="expensePage payHistory">
        <div className="expensePage__inner">
          {length ? (
            <div className="emptyDataInner">
              <p>Список оплат пустой</p>
            </div>
          ) : (
            <div className="list">
              {listHistoryPaysInWH?.map((item) => (
                <div>
                  <div className="mainData">
                    <p>{item?.date}</p>
                    <span>Оплата в кассу</span>
                  </div>
                  <div className="status">
                    <p
                      style={{
                        color: statusPay?.[item?.status]?.color || "red",
                      }}
                    >
                      {statusPay?.[item?.status]?.text || "Ожидание"}
                    </p>
                    <p>{item?.amount} сом</p>
                    {/* {item?.status == 0 && (
                    )} */}
                    <button className="file" onClick={() => setPdf(item)}>
                      <FileOpenIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <PayKassaReport pdf={pdf} setPdf={setPdf} />
    </>
  );
};

export default HistoryPayPage;

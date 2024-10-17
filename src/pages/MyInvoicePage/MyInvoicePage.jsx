////// hooks
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// helpers
import { roundingNum } from "../../helpers/totals";
import { objTypeInvoice } from "../../helpers/objs";

////// style
import "./style.scss";

////// components
import EveryInvoiceModal from "../../components/MyInvoicePage/Modals/EveryInvoiceModal/EveryInvoiceModal";
import NavMenu from "../../common/NavMenu/NavMenu";

////// imgs
import ArrowNav from "@mui/icons-material/ArrowForwardIosSharp";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import SummarizeIcon from "@mui/icons-material/Summarize";

////// fns
import { setInvoiceInfo } from "../../store/reducers/mainSlice";
import { getMyInvoice } from "../../store/reducers/invoiceSlice";

const MyInvoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { dataSave } = useSelector((state) => state.saveDataSlice);
  const { listInvoice } = useSelector((state) => state.invoiceSlice);

  useEffect(() => {
    dispatch(getMyInvoice(dataSave?.guid)); /// run
  }, []);

  const clickSeller = ({ invoice_guid }, index) => {
    dispatch(setInvoiceInfo({ guid: invoice_guid, action: 8, index }));
  };

  const listNav = [
    {
      text: "Принятые",
      icon: <ChecklistRtlIcon sx={{ width: 20, height: 20 }} />,
      color: "#4361ee",
      url: "/accept_invoice",
    },
    {
      text: "Отпускные",
      icon: <SummarizeIcon sx={{ width: 20, height: 20 }} />,
      color: "#805dca",
      url: "/send_invoice",
    },
  ];

  return (
    <>
      <NavMenu navText={"Список накладных"} />
      <div className="navAction invoices">
        {listNav?.map((item) => (
          <button
            style={{ background: item?.color }}
            onClick={() => navigate(item?.url)}
          >
            {item?.icon}
            <p>{item?.text}</p>
          </button>
        ))}
      </div>

      {listInvoice?.length == 0 ? (
        <div className="emptyData">
          <p>Список пустой</p>
        </div>
      ) : (
        <div className="myInvoicePage">
          {listInvoice?.map((item, index) => (
            <button
              className="invoiceParent"
              onClick={() => clickSeller(item, index + 1)}
            >
              <div className="invoiceParent__inner">
                <div className="mainData">
                  <p className="indexNums">{index + 1}</p>
                  <div>
                    <p className="titleDate role">{item?.user_create}</p>
                    <p className="titleDate">{item.date}</p>
                  </div>
                </div>
                {!!item?.comment ? (
                  <p className="comments">{item.comment}</p>
                ) : (
                  <p className="comments"> ...</p>
                )}
              </div>
              <div className="mainDataArrow">
                <div>
                  <p style={{ color: objTypeInvoice?.[item?.status]?.color }}>
                    {objTypeInvoice?.[item?.status]?.text}
                  </p>
                  <span className="totalPrice">
                    {roundingNum(item?.total_price, 2)} сом
                  </span>
                </div>
                <div className="arrows">
                  <ArrowNav sx={{ color: "rgba(162, 178, 238, 0.839)" }} />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <EveryInvoiceModal />
    </>
  );
};

export default MyInvoicePage;

/////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/////// components
import NavMenu from "../../../common/NavMenu/NavMenu";

/////// fns
import { getInvoiceReturn } from "../../../store/reducers/invoiceSlice";

////// helpers
import { roundingNum } from "../../../helpers/totals";

////// style
import "./style.scss";

////// icons
import AddIcon from "../../../assets/MyIcons/AddIcon";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import SummarizeIcon from "@mui/icons-material/Summarize";

const ReturnHistoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { dataSave } = useSelector((state) => state.saveDataSlice);
  const { listInvoiceReturn } = useSelector((state) => state.invoiceSlice);

  useEffect(() => {
    const data = {
      reciever_guid: "b85094a9-d70a-46ab-a724-5f3d7a506b37",
      sender_guid: dataSave?.guid,
      date_from: "2024-09-10",
      date_to: "2024-10-23",
      reciever_type: 3,
    };
    dispatch(getInvoiceReturn(data));
  }, []);

  const objType = {
    0: { text: "Ожидание", color: "red" },
    1: { text: "Отгружено", color: "red" },
    2: { text: "Принято", color: "green" },
  };

  const clickInvoice = (item) => {
    navigate(`/invoice/view`, { state: item });
  };

  const createReturnForAdmin = () => {
    const obj = {};
    navigate(`/return/create`, { state: obj });
  };

  return (
    <>
      <NavMenu navText={"История возврата"} />
      <div className="returnHistoryPage">
        <div className="listBlock">
          {listInvoiceReturn?.map((item, index) => (
            <button
              className="invoiceParent"
              onClick={() => clickInvoice(item)}
              key={index}
            >
              <div className="invoiceParent__inner">
                <div className="mainData">
                  <p className="indexNums">{index + 1}</p>
                  <div>
                    <p className="role">{item?.reciever || "..."}</p>
                    <p className="titleDate">{item?.date}</p>
                  </div>
                </div>
                {!!item?.title && item?.title != "undefined" ? (
                  <p className="comments">{item?.title}</p>
                ) : (
                  <p className="comments"> ...</p>
                )}
              </div>
              <div className="mainDataArrow">
                <div>
                  <p style={{ color: objType?.[item?.status]?.color }}>
                    {objType?.[item?.status]?.text}
                  </p>
                  <span className="totalPrice">
                    {roundingNum(item?.total_price)} сом
                  </span>
                </div>
                <div className="arrow"></div>
              </div>
            </button>
          ))}
        </div>
        <button className="createReturn" onClick={createReturnForAdmin}>
          <AddIcon width={16} height={16} color={"#fff"} />
          <p>Оформить возврат в цех</p>
        </button>
      </div>
    </>
  );
};

export default ReturnHistoryPage;

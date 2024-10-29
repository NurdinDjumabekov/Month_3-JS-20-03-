////// hooks
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////// components
import ListAcceptProdSI from "../ListAcceptProdSI/ListAcceptProdSI";

////// helpers

////// fns
import { createEditProdInInvoiceSI } from "../../../store/reducers/invoiceSlice";

////// icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

////// style
import "./style.scss";

const ListAcceptInvoiceSI = ({ route_guid, guid_point }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { dataSave } = useSelector((state) => state.saveDataSlice);
  const { invoice_guid } = useSelector(
    (state) => state.invoiceSlice?.invoiceSendInfo
  );
  const { listSendOrdersSI } = useSelector((state) => state.invoiceSlice);

  const editProdInInvoice = async () => {
    const forCreate = { listProdsSI: listSendOrdersSI, comment: "" };
    const forSendTT = {
      invoice_guid,
      date_from: "2024-06-09 11:00", /// просто надо заполнить
      date_to: "2024-06-09 17:30", /// просто надо заполнить
      status: 1, /// 2 подтвержден агентом
      user_guid: dataSave?.guid,
      user_type: 1, // 1 agent 2 admin
      user_type1: 1, // 1 agent 2 admin
      route_guid,
      navigate,
    };
    const invoiceInfo = { invoice_guid, action: 2, route_guid }; //// редактирование товара (action: 2)

    const send = { forCreate, invoiceInfo, forSendTT };
    const res = await dispatch(createEditProdInInvoiceSI(send)).unwrap();
    ///// добавление и редактирование товаров в заявке

    if (res?.result == 1) {
      navigate("/");
      setTimeout(() => {
        navigate("/maps");
      }, 100);
    }
  };

  return (
    <div className="listInvoice">
      <div className="acceptActionsSI">
        <div className="acceptActionsSI__inner">
          <button className="saveAction SI" onClick={editProdInInvoice}>
            <LibraryAddIcon sx={{ width: 16, height: 16 }} />
            <p>Отпустить накладную</p>
          </button>
        </div>
      </div>
      <ListAcceptProdSI editProdInInvoice={editProdInInvoice} />
    </div>
  );
};

export default ListAcceptInvoiceSI;

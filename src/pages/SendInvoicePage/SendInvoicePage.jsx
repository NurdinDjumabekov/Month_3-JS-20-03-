///// hooks
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

////// imgs

////// components
import ModalCreateInvoice from "../../components/SendInvoicePage/Modals/ModalCreateInvoice/ModalCreateInvoice";

/////// fns
import { createInvoiceSendTT } from "../../store/reducers/invoiceSlice";
import { useParams } from "react-router-dom";

const SendInvoicePage = () => {
  const dispatch = useDispatch();

  const { route_guid, guid_point } = useParams();

  const { dataSave } = useSelector((state) => state.saveDataSlice);

  useEffect(() => {
    const data = {
      sender_guid: dataSave?.guid, // guid отправителя
      sender_type: dataSave?.user_type, // 1
      reciever_guid: guid_point, // guid получателя
      reciever_type: 4, // type продавца
      user_guid: dataSave?.guid, // guid человека кто создает
      user_type: dataSave?.user_type, // 1
    };
    dispatch(createInvoiceSendTT({ data, seller_guid: guid_point }));
  }, [guid_point]);

  return <ModalCreateInvoice route_guid={route_guid} guid_point={guid_point} />;
};

export default SendInvoicePage;

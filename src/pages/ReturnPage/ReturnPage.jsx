/////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

/////// components
import NavMenu from "../../common/NavMenu/NavMenu";
import CreateInvoiceReturn from "../../components/ReturnPage/CreateInvoiceReturn/CreateInvoiceReturn";

/////// fns
import { createInvoiceReturn } from "../../store/reducers/invoiceSlice";
import { getListWorkShop } from "../../store/reducers/mainSlice";

////// style
import "./style.scss";

////// icons

const ReturnPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [invoiceGuid, setInvoiceGuid] = useState("");

  const { route_guid, guid_point, type } = useParams(); //// в guid_point лежит guid продавца
  const oldComment = location.state?.comment;
  const guidRoute = location.state?.guid; // guid каждого маршрута

  const { dataSave } = useSelector((state) => state.saveDataSlice);

  useEffect(() => {
    const data = {
      sender_guid: dataSave?.guid, // guid отпровителя
      sender_type: 1,
      reciever_guid: guid_point, // guid получателя
      reciever_type: 4,
      user_guid: dataSave?.guid, // guid человека кто создает
      user_type: 1,
      comment: "RETURN INVOICE",
      invoice_type: 4, // всегда 4!
      route_guid: route_guid,
    };

    dispatch(getListWorkShop());

    const getData = async () => {
      const res = await dispatch(createInvoiceReturn(data)).unwrap();
      setInvoiceGuid(res?.invoice_guid);
    };

    getData();
  }, []);

  return (
    <>
      <NavMenu navText={"Возврат товара"} />
      <div className="returnPage"></div>
      <CreateInvoiceReturn invoice_guid={invoiceGuid} />
    </>
  );
};

export default ReturnPage;

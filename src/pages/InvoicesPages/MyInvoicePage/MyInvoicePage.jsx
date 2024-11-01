////// hooks
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// helpers
import { objTypeInvoice } from "../../../helpers/objs";

////// style
import "./style.scss";

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";
import InvoiceComponent from "../../../common/InvoiceComponent/InvoiceComponent";

////// fns
import { getMyInvoice } from "../../../store/reducers/invoiceSlice";

const MyInvoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { dataSave } = useSelector((state) => state.saveDataSlice);
  const { listInvoice } = useSelector((state) => state.invoiceSlice);

  useEffect(() => {
    dispatch(getMyInvoice(dataSave?.guid));
  }, []);

  const objRole = { 1: "reciever", 2: "sender" };

  const clickInvoice = (item) => {
    navigate(`/invoice/view`, { state: { ...item, action: item?.status } });
  };

  return (
    <div className="myInvoicePageParent">
      <NavMenu navText={"Список накладных"} />
      {listInvoice?.length == 0 ? (
        <div className="emptyData">
          <p>Список пустой</p>
        </div>
      ) : (
        <div className="myInvoicePage">
          {listInvoice?.map((item, index) => (
            <InvoiceComponent
              item={item}
              index={index}
              objRole={objRole}
              clickInvoice={clickInvoice}
              objStatus={objTypeInvoice}
              title={"sender_type"}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyInvoicePage;

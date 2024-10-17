/////// hooks
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

/////// components
import NavMenu from "../../common/NavMenu/NavMenu";
import EveryMyInvoice from "../../components/ReturnPage/EveryMyInvoice/EveryMyInvoice";
import CreateInvoiceReturn from "../../components/ReturnPage/CreateInvoiceReturn/CreateInvoiceReturn";

/////// fns
import { getInvoiceReturn } from "../../store/reducers/invoiceSlice";

////// helpers
import { listInvReturn } from "../../helpers/LocalData";

////// style
import "./style.scss";

////// icons
import arrow from "../../assets/icons/arrowNav.svg";
import AddBoxIcon from "@mui/icons-material/AddBox";

const ReturnPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { route_guid, guid_point, type } = useParams(); //// в guid_point лежит guid продавца
  const oldComment = location.state?.comment;
  const guidRoute = location.state?.guid; // guid каждого маршрута

  const [create, setCreate] = useState(false);

  useEffect(() => {
    dispatch(getInvoiceReturn());
  }, []);

  const nav = () => navigate("/return_history");

  return (
    <>
      <NavMenu navText={"Возврат товара"} />
      <div className="returnPage">
        <div className="listBlock">
          {listInvReturn?.map((item, index) => (
            <EveryMyInvoice obj={item} key={item?.guid} index={index} />
          ))}
        </div>
      </div>
      <CreateInvoiceReturn setCreate={setCreate} create={create} />
    </>
  );
};

export default ReturnPage;

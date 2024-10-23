/////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

/////// components
import NavMenu from "../../../common/NavMenu/NavMenu";
import AcceptProd from "../../../components/ReturnsPages/AcceptProd/AcceptProd";
import ChoiceProd from "../../../components/ReturnsPages/ChoiceProd/ChoiceProd";
import { FormControlLabel, Switch } from "@mui/material";

////// helpers

////// style
import "./style.scss";

////// icons

////// fns
import { createInvoiceReturn } from "../../../store/reducers/invoiceSlice";

const ReturnCreatePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [active, setActive] = useState(false);
  const [invoiceGuid, setInvoiceGuid] = useState("");

  //   const { file, total_price, total_count } = location.state; //// хранятся данные накладной

  const { dataSave } = useSelector((state) => state.saveDataSlice);

  const create = async () => {
    const send = {
      sender_guid: dataSave?.guid, // guid отпровителя
      sender_type: 1,
      reciever_guid: "b85094a9-d70a-46ab-a724-5f3d7a506b37", // guid получателя
      reciever_type: 3, // на склад
      user_guid: dataSave?.guid, // guid человека кто создает
      user_type: 1,
      comment: "Возврат накладной",
      invoice_type: 4, // всегда 4!
    };
    const res = await dispatch(createInvoiceReturn(send)).unwrap();
    setInvoiceGuid(res?.invoice_guid);
  };

  useEffect(() => {
    create(); /// для полчсения guid накладной возврата
  }, []);

  return (
    <>
      <NavMenu navText={`Оформление возврата`} />
      <div className="returnCreate">
        <div className="checkboxreturn">
          <FormControlLabel
            control={
              <Switch
                value={active}
                onChange={(e) => setActive(e.target.checked)}
                sx={{
                  "& .MuiSwitch-switchBase": {
                    color: "#1976d2",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#1976d2",
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: "#1976d2",
                  },
                  "& .MuiSwitch-track.Mui-checked": {
                    backgroundColor: "#1976d2",
                  },
                }}
              />
            }
          />
        </div>
        {/* <div className="actions">
          {listNav?.map((i) => (
            <button
              className={i?.id == active ? "active" : ""}
              key={i?.id}
              onClick={() => setActive(i?.id)}
            >
              {i?.icon}
              <p>{i?.text}</p>
            </button>
          ))}
        </div> */}
        <div className="lists">
          {active ? (
            <ChoiceProd invoiceGuid={invoiceGuid} />
          ) : (
            <AcceptProd invoiceGuid={invoiceGuid} />
          )}
        </div>
      </div>
    </>
  );
};

export default ReturnCreatePage;

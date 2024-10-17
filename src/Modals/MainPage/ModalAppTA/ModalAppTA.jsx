////// hooks
import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Tooltip } from "@mui/material";
import InfoProds from "./InfoProds/InfoProds";

////// style
import "./style.scss";

////// icons
import user from "../../../assets/images/iAm.jpg";

////// fns
import { clearOrders, getListOrders } from "../../../store/reducers/mainSlice";
import { clearListOrders } from "../../../store/reducers/mainSlice";
import { getHistoryInvoice } from "../../../store/reducers/mainSlice";
import { getListTA, setInvoiceInfo } from "../../../store/reducers/mainSlice";

////// helpers
import { styleTooltip } from "../../../helpers/LocalData";
import { searchActiveOrdersTA } from "../../../helpers/searchActiveOrdersTA";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalAppTA = () => {
  const dispatch = useDispatch();

  const [active, setActive] = useState("");

  const { listTA, activeDate } = useSelector((state) => state.mainSlice);
  const { invoiceInfo, activeDateHistory } = useSelector(
    (state) => state.mainSlice
  );

  const clickAgent = (agent_guid) => {
    setActive(agent_guid);
    const data = { date_from: activeDateHistory, date_to: activeDateHistory };
    const obj = { agents_guid: [agent_guid], history: 1 };
    // dispatch(getHistoryInvoice({ ...data, ...obj })); // get список историй заявок
  };

  const getData = async () => {
    try {
      await dispatch(getListTA({ first: false })).unwrap();
      await setActive(listTA?.[0]?.guid);
      const data = { date_from: activeDateHistory, date_to: activeDateHistory };
      const obj = { agents_guid: [listTA?.[2]?.guid], history: 1 };
      // dispatch(getHistoryInvoice({ ...data, ...obj })); // get список историй заявок
    } catch (error) {}
  };

  useEffect(() => {
    if (invoiceInfo?.action == 1) {
      getData();
    } else {
      // dispatch(clearOrders()); //// очищаю список заказа от ТА
      // dispatch(clearListOrders()); ///// очищаю временный список для отправки создания заказа от ТА
      //// при закрытии модалки очищаю заявки каждого агента
    }
  }, [invoiceInfo?.action]);

  const handleClose = () => {
    const obj = { guid: "", action: 0, listInvoice: [] };
    dispatch(setInvoiceInfo(obj));
    // dispatch(clearOrders()); //// очищаю список заказа от ТА
    // dispatch(clearListOrders()); ///// очищаю временный список для отправки создания заказа от ТА
    const agents_guid = searchActiveOrdersTA(listTA);
    dispatch(getListOrders({ ...activeDate, agents_guid }));
    //// когда будет меняться диапозон надо get заявки с обновленным диапозоном
  };

  return (
    <Dialog
      fullScreen
      open={invoiceInfo?.action == 1}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <div className="modalPayTA">
        <div className="modalPayTA__header">
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <div className="menu">Реестр заявок</div>
              <span>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </span>
            </Toolbar>
          </AppBar>
        </div>
        <div className="modalPayTA__main">
          <div className="listAgentsInfo">
            <h6>Торговые агенты</h6>
            <div className="listAgentsInfo__inner">
              {listTA?.map((i) => (
                <button
                  key={i?.guid}
                  onClick={() => clickAgent(i?.guid)}
                  className={active == i?.guid ? "active" : ""}
                >
                  <div className="logo">
                    <Tooltip
                      title={
                        <div style={{ borderRadius: "50%" }}>
                          <img src={user} alt="user" style={styleTooltip} />
                        </div>
                      }
                      placement="right"
                      disableInteractive
                    >
                      <img src={i?.photo || user} alt="" />
                    </Tooltip>
                  </div>
                  <div className="content">
                    <p>{i?.fio}</p>
                    <span>{i?.phone || "0700754454"} </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <InfoProds active={active} />
        </div>
      </div>
    </Dialog>
  );
};

export default ModalAppTA;

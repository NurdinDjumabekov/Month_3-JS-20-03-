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

////// style
import "./style.scss";

////// icons
import user from "../../../assets/images/iAm.jpg";

////// fns
import { getListTA, setInvoiceInfo } from "../../../store/reducers/mainSlice";
import { styleTooltip } from "../../../helpers/LocalData";
import { getEveryDebt, setDebtEveryTA } from "../../../store/reducers/paySlice";
import InfoDebit from "./InfoDebit/InfoDebit";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalPayTA = () => {
  const dispatch = useDispatch();

  const [active, setActive] = useState("");

  const { invoiceInfo } = useSelector((state) => state.mainSlice);
  const { listTA } = useSelector((state) => state.mainSlice);
  const { debtEveryTA } = useSelector((state) => state.paySlice);

  const clickAgent = (agent_guid) => {
    setActive(agent_guid);
    dispatch(getEveryDebt({ agent_guid })); //  get список долгов каждого ТА
  };

  const handleClose = () => {
    const obj = { guid: "", action: 0, listInvoice: [] };
    dispatch(setInvoiceInfo(obj));
  };

  const getData = async () => {
    try {
      await dispatch(getListTA({ first: false })).unwrap();
      await setActive(listTA?.[9]?.guid);
      dispatch(getEveryDebt({ agent_guid: listTA?.[9]?.guid }));
    } catch (error) {}
  };

  useEffect(() => {
    if (invoiceInfo?.action == 7) {
      getData();
    } else {
      dispatch(setDebtEveryTA({ vozvrat: [], dolg: [] }));
      //// при закрытии модалки очищаю долг каждого агента
    }
  }, [invoiceInfo?.action]);

  return (
    <Dialog
      fullScreen
      open={invoiceInfo?.action == 7}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <div className="modalPayTA">
        <div className="modalPayTA__header">
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <div className="menu">Долги и оплаты ТА</div>
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
                    <span>Баланс: {i?.bonuse} сом</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <InfoDebit debtEveryTA={debtEveryTA} />
        </div>
      </div>
    </Dialog>
  );
};

export default ModalPayTA;

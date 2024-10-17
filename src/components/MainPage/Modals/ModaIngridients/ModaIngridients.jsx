////// hooks
import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import ListIngredients from "../../ActionsAllDay/ListIngredients/ListIngredients";
import ListProds from "../../ActionsAllDay/ListProds/ListProds";
import ListZames from "../../ActionsAllDay/ListZames/ListZames";

////// style
import "./style.scss";

////// fns
import { actionsInvoiceAllDay } from "../../../../store/reducers/mainSlice";
import { getListTA } from "../../../../store/reducers/mainSlice";
import { getListWorkShop } from "../../../../store/reducers/mainSlice";
import { setInvoiceInfo } from "../../../../store/reducers/mainSlice";

////// helpers
import { listActionsTitle } from "../../../../helpers/objs";
import { searchActiveOrdersTA } from "../../../../helpers/searchActiveOrdersTA";

////// icons
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AddProdInDay from "../../ActionsAllDay/AddProdInDay/AddProdInDay";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModaIngridients = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(1); // 1,2,3

  const { invoiceInfo } = useSelector((state) => state.mainSlice);
  const { listsForProduction } = useSelector((state) => state.mainSlice);
  const { list_ingredient, list_products } = listsForProduction;
  const { listTA, activeDate } = useSelector((state) => state.mainSlice);
  const { checkInvoice } = useSelector((state) => state.mainSlice);

  const handleClose = () => dispatch(setInvoiceInfo({ guid: "", action: 0 }));

  const sendProduction = () => {
    //// для обновление списка
    const agents_guid = searchActiveOrdersTA(listTA);
    const props = { activeDate, agents_guid };

    /// отправить в производство (изменение статуса)
    ///(status: 1 - в произ-во, (обработку)
    const data = { invoice_guids: invoiceInfo?.listInvoice, status: 1 };
    dispatch(actionsInvoiceAllDay({ data, props }));
  };

  const obj = {
    1: {
      comp: <ListProds list={list_products} />,
      length: list_products?.length,
    },
    2: {
      comp: <ListIngredients list={list_ingredient} />,
      length: list_ingredient?.length,
    },
    3: {
      comp: <ListZames list={[]} />,
      length: 5,
    },
  };

  useEffect(() => {
    if (invoiceInfo?.action == 0) {
      setActive(1);
    } else if (invoiceInfo?.action == 3) {
      dispatch(getListWorkShop()); /// get список цехов
      dispatch(getListTA({ first: true })); /// get список агентов
    }
  }, [invoiceInfo?.action]);

  return (
    <Dialog
      fullScreen
      open={invoiceInfo?.action == 3}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <div className="mainBlockIngrid">
        <div className="mainBlockIngrid__inner">
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Typography sx={{ flex: 1 }} variant="h6" component="div">
                <div className="actionsBtns">
                  {listActionsTitle?.map((item) => (
                    <button
                      key={item?.id}
                      onClick={() => setActive(item?.id)}
                      className={active == item?.id ? "activeBtn" : ""}
                    >
                      {active == item?.id ? item?.imgActive : item?.img}
                      <p>
                        {item?.name} [{obj?.[item?.id]?.length}]
                      </p>
                    </button>
                  ))}
                </div>
              </Typography>
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
        <div className="mainBlockIngrid__table">
          <section>
            <div className="action">
              <button onClick={sendProduction} disabled={!checkInvoice}>
                <AddBusinessIcon sx={{ width: 16 }} />
                <p>В производство</p>
              </button>
            </div>
          </section>
          <div className="listsInvoice">
            <AddProdInDay />
            {obj?.[active]?.comp}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ModaIngridients;

/////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

/////// style
import "./style.scss";
import { styled } from "@mui/styles";

////// components
import { Tooltip, tooltipClasses } from "@mui/material";

////// helpers
import { objStatusOrders } from "../../../helpers/objs";

/////// fns
import { getEveryDataDay } from "../../../store/reducers/mainSlice";
import { setInvoiceInfo } from "../../../store/reducers/mainSlice";
import { searchActiveOrdersTA } from "../../../helpers/searchActiveOrdersTA";
import { roundingNum } from "../../../helpers/totals";
import { setActiveTA } from "../../../store/reducers/selectsSlice";

/////// icons
import GroupIcon from "@mui/icons-material/Group";
import PaidIcon from "@mui/icons-material/PaymentsOutlined";
import CounterIcon from "@mui/icons-material/FormatListNumberedRtl";

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 300,
    maxHeight: 500,
    padding: 10,
  },
  "& p": {
    fontSize: "12px",
    margin: "5px 0",
  },
});

const EveryDataDay = ({ content }) => {
  const { status, agents_counts } = content?.event?._def?.extendedProps;
  const { total_sum, total_count } = content?.event?._def?.extendedProps;
  const { invoice_guid, date_from } = content?.event?._def?.extendedProps;
  const { list_workshop } = content?.event?._def?.extendedProps;

  const { listTA } = useSelector((state) => state.mainSlice);
  const { listOrders } = useSelector((state) => state.mainSlice);

  const dispatch = useDispatch();

  const readAllInvoiceEveryDay = () => {
    dispatch(setActiveTA({})); //// очищаю данные ТА для выбора нового ТА
    const agents_guid = searchActiveOrdersTA(listTA);
    const data = { agents_guid, date_from, date_to: date_from };
    dispatch(getEveryDataDay(data));
    ////// get список данных целого дня (продукты и ингредиенты)

    const listInvoice = listOrders
      ?.filter((i) => i?.date_from?.includes(date_from))
      ?.map((i) => i?.invoice_guid);

    ///// просмотр всех ингредиентов для отправки в произ-во ( action: 3)
    const obj = { guid: invoice_guid, action: 3, listInvoice };
    dispatch(setInvoiceInfo({ ...obj, date_from }));
  };

  return (
    <div className="everyOrder day" onClick={readAllInvoiceEveryDay}>
      <CustomWidthTooltip
        disableInteractive
        title={
          <ul
            className="moreInfoOrders"
            style={{ maxHeight: 145, overflow: "hidden" }}
          >
            {list_workshop?.map((i, index) => (
              <p key={index}>
                Цех: {i?.name}, {i?.total_count} товара на сумму{" "}
                {roundingNum(+i?.total_price)} сом
              </p>
            ))}
            <span style={{ fontSize: 12, textDecoration: "underline" }}>
              Всего 3 замеса
            </span>
          </ul>
        }
        placement="top"
        arrow
      >
        <div className="everyOrder__inner">
          <div className="status">
            <Tooltip
              title={objStatusOrders?.[status]?.text}
              placement="right-start"
              slotProps={{
                popper: {
                  modifiers: [{ name: "offset", options: { offset: [0, -8] } }],
                },
              }}
            >
              <>
                <h3>
                  <GroupIcon /> Агент: {agents_counts}
                </h3>
                <h3 className="dayEveryd">
                  <PaidIcon />
                  Сумма: {roundingNum(total_sum)} сом
                </h3>
                <h3 className="dayEveryd">
                  <CounterIcon />
                  Кол-во: {roundingNum(total_count)} шт
                </h3>
              </>
            </Tooltip>
          </div>
        </div>
      </CustomWidthTooltip>
    </div>
  );
};

export default EveryDataDay;

/////// hooks
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

/////// style
import "./style.scss";

////// components
import { Tooltip } from "@mui/material";

////// helpers
import { objStatusOrders } from "../../../helpers/objs";

/////// fns

////// icons
import UserIcon from "@mui/icons-material/AccountCircle";
import PaidIcon from "@mui/icons-material/PaymentsOutlined";

const EveryDataHour = ({ content }) => {
  const { status, agent, invoice_guid } = content?.event?._def?.extendedProps;
  const { total_price, date_from } = content?.event?._def?.extendedProps;
  const { date_to } = content?.event?._def?.extendedProps;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editEveryInvoice = () => {
    const obj = { action: 1, date_from, date_to, invoice_guid };
    // редактирвоание заявки
    navigate("/app/crud_invoice", { state: obj });
  };

  return (
    <div
      className={`everyOrder ${status == 3 ? "deActive" : ""}`}
      onClick={editEveryInvoice}
    >
      <div className="everyOrder__inner hourTitle">
        <h5 className="titleHour">
          <UserIcon />
          <p>{agent}</p>
          <div className="status">
            <Tooltip
              title={
                objStatusOrders?.[status]?.text ||
                "Заявка скоро будет обработана"
              }
              placement="top"
              arrow
              disableInteractive
              slotProps={{
                popper: {
                  modifiers: [{ name: "offset", options: { offset: [0, -1] } }],
                },
              }}
            >
              <div className="status__inner">
                {objStatusOrders?.[status]?.icon}
              </div>
              <p></p>
            </Tooltip>
          </div>
        </h5>
        <p className="name">
          <PaidIcon />
          {total_price} с
        </p>
      </div>
    </div>
  );
};

export default EveryDataHour;

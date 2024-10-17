import { ru } from "date-fns/locale";

////// hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import { Table, TableBody, TableCell, Tooltip } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import ReactDatePicker from "react-datepicker";

////// fns
import { setActiveDate } from "../../../../store/reducers/productionSlice";
import { getListTA } from "../../../../store/reducers/mainSlice";
import { getHistoryInvoice } from "../../../../store/reducers/wareHouseSlice";
import user from "../../../../assets/images/iAm.jpg";

////// style
import "./style.scss";

////// icons
import FileIcon from "@mui/icons-material/Description";
import EventIcon from "@mui/icons-material/EventNoteTwoTone";

////// helpers
import { transformActionDate } from "../../../../helpers/transformDate";
import { reverseTransformActionDate } from "../../../../helpers/transformDate";
import { objStatusInvoice, styleTooltip } from "../../../../helpers/LocalData";

const HistoryInvoice = () => {
  const dispatch = useDispatch();

  const [active, setActive] = useState("");

  const { listTA } = useSelector((state) => state.mainSlice);
  const { listHistoryInvoice } = useSelector((state) => state.wareHouseSlice);
  const { activeDate } = useSelector((state) => state.productionSlice);

  const onChangeDate = (item) => {
    dispatch(setActiveDate(transformActionDate(item)));
    const obj = { activeDate: transformActionDate(item), agent_guid: active };
    dispatch(getHistoryInvoice(obj));
  };

  const clickAgent = (agent_guid) => {
    setActive(agent_guid);
    dispatch(getHistoryInvoice({ activeDate, agent_guid }));
  };

  const getData = async () => {
    try {
      await dispatch(getListTA({ first: false })).unwrap();
      await setActive(listTA?.[0]?.guid);
      const obj = { activeDate, agent_guid: listTA?.[0]?.guid };
      dispatch(getHistoryInvoice(obj));
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="historyInvoice">
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

              <div>
                <p>{i?.fio}</p>
                <span>{i?.phone || "0700754454"} </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="historyInvoice__data">
        <div className="historyInvoice__data__inner">
          <div className="prods">
            <div className="prods__sortDate">
              <div className="date">
                <ReactDatePicker
                  selected={reverseTransformActionDate(activeDate)}
                  onChange={onChangeDate}
                  yearDropdownItemNumber={100}
                  placeholderText="ДД.ММ.ГГГГ"
                  shouldCloseOnSelect={true}
                  scrollableYearDropdown
                  dateFormat="dd.MM.yyyy"
                  locale={ru}
                  maxDate={new Date()}
                />
                <EventIcon />
              </div>
            </div>
            <TableContainer
              component={Paper}
              sx={{ maxHeight: "100%" }}
              className="scroll_table standartTable"
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ width: "5%" }}>
                      №
                    </TableCell>
                    <TableCell align="left" style={{ width: "15%" }}>
                      Сумма
                    </TableCell>
                    <TableCell align="left" style={{ width: "15%" }}>
                      Кол-во
                    </TableCell>
                    <TableCell align="left" style={{ width: "15%" }}>
                      Дата отпуска
                    </TableCell>
                    <TableCell align="left" style={{ width: "15%" }}>
                      Дата принятия
                    </TableCell>
                    <TableCell align="left" style={{ width: "20%" }}>
                      Статус
                    </TableCell>
                    <TableCell align="left" style={{ width: "15%" }}>
                      Файлы
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listHistoryInvoice?.map((row, index) => (
                    <TableRow key={row?.invoice_guid}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ width: "5%" }}
                        align="center"
                      >
                        {row?.codeid}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ width: "15%" }}
                      >
                        {row?.total_price} сом
                      </TableCell>
                      <TableCell align="left" style={{ width: "15%" }}>
                        {row?.total_count} кг
                      </TableCell>
                      <TableCell align="left" style={{ width: "15%" }}>
                        {row?.sender_conf_date || "01.10.2024 17:12"}
                      </TableCell>
                      <TableCell align="left" style={{ width: "15%" }}>
                        {row?.reciever_conf_date || "01.10.2024 19:50"}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          width: "20%",
                          color: objStatusInvoice?.[row?.status]?.color,
                        }}
                      >
                        {objStatusInvoice?.[row?.status]?.text}
                      </TableCell>
                      <TableCell align="left" style={{ width: "15%" }}>
                        <a
                          href={row?.file}
                          className="invoiceFile"
                          target="_blank"
                        >
                          <FileIcon sx={{ width: 15, height: 15 }} />
                          <p>Накладная</p>
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryInvoice;

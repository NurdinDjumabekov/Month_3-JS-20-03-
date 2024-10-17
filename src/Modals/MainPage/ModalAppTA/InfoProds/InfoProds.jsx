import { ru } from "date-fns/locale";

////// hooks
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

////// components
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import DatePicker from "react-datepicker";

/////// helpers
import { objStatusOrdersMini } from "../../../../helpers/objs";
import { reverseTransformActionDate } from "../../../../helpers/transformDate";
import { transformActionDate } from "../../../../helpers/transformDate";

/////// fns
import { getListProdsInInvoice } from "../../../../store/reducers/mainSlice";
import { setActiveDateHistory } from "../../../../store/reducers/mainSlice";
import { setActiveInvoiceHistory } from "../../../../store/reducers/mainSlice";
import { getHistoryInvoice } from "../../../../store/reducers/mainSlice";

const InfoProds = ({ active }) => {
  const dispatch = useDispatch();

  const { listOrders, listSendOrders, activeInvoiceHistory } = useSelector(
    (state) => state.mainSlice /// список заявок и товаров каждой заявки
  );

  const { activeDateHistory } = useSelector((state) => state.mainSlice);

  const onChangeDate = async (item) => {
    ///// сортировка заявок по дате
    dispatch(setActiveDateHistory(transformActionDate(item)));
    const data = {
      date_from: transformActionDate(item),
      date_to: transformActionDate(item),
    };
    const obj = { agents_guid: [active], history: 1 };
    dispatch(getHistoryInvoice({ ...data, ...obj })); // get список историй заявок
  };

  const clickInvoice = ({ invoice_guid }) => {
    dispatch(setActiveInvoiceHistory(invoice_guid)); /// для активной накладной
    dispatch(getListProdsInInvoice(invoice_guid)); //// для получения товаров
  };

  return (
    <div className="infoProdsApp">
      <div className="dolg">
        <h5>Заявки</h5>
        <div className="date">
          <DatePicker
            selected={reverseTransformActionDate(activeDateHistory)}
            onChange={onChangeDate}
            yearDropdownItemNumber={100}
            placeholderText="ДД.ММ.ГГГГ"
            shouldCloseOnSelect={true}
            scrollableYearDropdown
            dateFormat="dd.MM.yyyy"
            locale={ru}
            maxDate={new Date()}
          />
        </div>
        <div className="dolg__inner">
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
                  <TableCell align="center" style={{ width: "5%" }}>
                    ...
                  </TableCell>
                  <TableCell align="left" style={{ width: "15%" }}>
                    ФИО
                  </TableCell>
                  <TableCell align="left" style={{ width: "15%" }}>
                    Дата создания
                  </TableCell>
                  <TableCell align="left" style={{ width: "15%" }}>
                    Дата исполнения
                  </TableCell>
                  <TableCell align="left" style={{ width: "15%" }}>
                    Сумма
                  </TableCell>
                  <TableCell align="left" style={{ width: "15%" }}>
                    Статус
                  </TableCell>
                  <TableCell align="left" style={{ width: "15%" }}>
                    Комментарий
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOrders?.map((row) => (
                  <TableRow
                    key={row?.codeid}
                    onClick={() => clickInvoice(row)}
                    className="everyInvoice"
                  >
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
                      style={{ width: "5%" }}
                    >
                      <div className="checkboxTable">
                        <input
                          type="checkbox"
                          name="check"
                          checked={row?.invoice_guid === activeInvoiceHistory}
                        />
                      </div>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "15%" }}
                    >
                      {row?.agent}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "15%" }}
                    >
                      {row?.date}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "15%" }}
                    >
                      {row?.date_from}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "15%" }}
                    >
                      {row?.total_price} сом
                    </TableCell>

                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "15%" }}
                    >
                      {objStatusOrdersMini?.[row?.status]}
                    </TableCell>

                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "15%" }}
                    >
                      Накладная {row?.invoice_codeid}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="vozvrat">
        <h5>Товары заявки</h5>
        <div className="dolg__inner">
          <TableContainer
            component={Paper}
            sx={{ maxHeight: "100%" }}
            className="scroll_table standartTable"
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ width: "8%" }}>
                    №
                  </TableCell>
                  <TableCell align="left" style={{ width: "23%" }}>
                    Наименование
                  </TableCell>
                  <TableCell align="left" style={{ width: "23%" }}>
                    Кол-во в кг
                  </TableCell>
                  <TableCell align="left" style={{ width: "23%" }}>
                    Кол-во в шт
                  </TableCell>
                  <TableCell align="left" style={{ width: "23%" }}>
                    Сумма
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listSendOrders?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "8%" }}
                      align="center"
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "23%" }}
                    >
                      {row?.product_name}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "23%" }}
                    >
                      {row?.count}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "23%" }}
                    >
                      {row?.count}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "23%" }}
                    >
                      {row?.price} сом
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2} align="left" className="footerTable">
                    Итого
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    {listSendOrders?.[0]?.total_count}
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    {listSendOrders?.[0]?.total_count}
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    {listSendOrders?.[0]?.total_price} сом
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default InfoProds;

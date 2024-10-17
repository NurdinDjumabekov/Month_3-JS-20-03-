////// hooks
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import { Table, TableBody, TableCell, Tooltip } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

////// fns
import {
  changeCountProduction,
  getListProdProduction,
  sendInWareHomeFN,
} from "../../../../store/reducers/productionSlice";
import { setListProduction } from "../../../../store/reducers/productionSlice";
import { setInvoiceInfo } from "../../../../store/reducers/mainSlice";

////// style
import "./style.scss";

////// helpers
import { emptyCountCheck, validNums } from "../../../../helpers/validations";
import { myAlert } from "../../../../helpers/MyAlert";

////// icons
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

import GeneratePdf from "../GeneratePdf/GeneratePdf";

const ListData = () => {
  const dispatch = useDispatch();

  const [activeInvoice, setActiveInvoice] = useState({});

  const { listTA, activeDate } = useSelector((state) => state.mainSlice);
  const { listProduction, listProductionInvoice } = useSelector(
    (state) => state.productionSlice
  );

  const onChangeCount = (e, item) => {
    const count = e?.target?.value?.replace(",", ".");

    if (validNums(count)) {
      //// валидцаия на числа
      return;
    }

    // if (count > item?.countOld) {
    //   return;
    // }

    dispatch(changeCountProduction({ ...item, count }));
    /////изменение ключа count в списке товаров производства
  };

  const clickInvoice = (item) => {
    setActiveInvoice(item);
    const list = item?.products?.map((i) => ({
      ...i,
      countOld: i.count,
    }));
    dispatch(setListProduction(list));
  };

  const sendInWareHome = () => {
    //// отправить с производства на склад
    if (emptyCountCheck(listProduction)) {
      myAlert("Поля не должны быть пустыми или равны 0", "error");
      return;
    }

    if (listProduction?.length == 0) {
      myAlert("Список пустой!", "error");
      return;
    }

    const products = listProduction?.map(({ product_guid, count, price }) => ({
      product_guid,
      count,
      workshop_price: price,
    }));

    const data = { products, invoice_guid: activeInvoice?.invoice_guid };
    dispatch(sendInWareHomeFN({ data, listTA, activeDate, setActiveInvoice }));
    ///  отправка товаров на склад через функцию

    if (listProductionInvoice?.length === 1) {
      const obj = { guid: "", action: 0, listInvoice: [], setActiveInvoice };
      dispatch(setInvoiceInfo(obj));
      /// для закрытия модалки только когда отправляется послдений список
    }
  };

  useEffect(() => {
    const obj = { date_from: "", date_to: "", setActiveInvoice };
    dispatch(getListProdProduction(obj));
  }, []);

  return (
    <div div className="productionData">
      <div className="productionData__inner">
        <div className="invoices scroll_table_hover">
          {listProductionInvoice?.length == 0 ? (
            <div className="emptyDataInner">
              <p>Список пустой</p>
            </div>
          ) : (
            listProductionInvoice?.map((item) => (
              <div
                className="invoices__every"
                onClick={() => clickInvoice(item)}
              >
                <div className="checkboxTable">
                  <input
                    type="checkbox"
                    name="check"
                    checked={item?.invoice_guid == activeInvoice?.invoice_guid}
                  />
                </div>
                <div>
                  <h6>Дата создания: {item?.date_from}</h6>
                  <p>{item?.comment}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="prods">
          <div className="prods__sortDate">
            <GeneratePdf activeInvoice={activeInvoice} />
            <button onClick={sendInWareHome} className="sendData">
              <AddBusinessIcon sx={{ width: 16 }} />
              <p>Отправить на склад</p>
            </button>
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
                  <TableCell style={{ width: "35%" }}>Продукт</TableCell>
                  <TableCell align="left" style={{ width: "10%" }}>
                    Цена
                  </TableCell>
                  <TableCell align="left" style={{ width: "10%" }}>
                    Количество
                  </TableCell>
                  <TableCell align="left" style={{ width: "10%" }}>
                    Разница
                  </TableCell>
                  <TableCell align="left" style={{ width: "15%" }}>
                    Дата начала изготовления
                  </TableCell>
                  <TableCell align="left" style={{ width: "15%" }}>
                    Дата окончания изготовления
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listProduction?.map((row, index) => (
                  <TableRow key={row?.product_guid}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "5%" }}
                      align="center"
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "35%" }}
                    >
                      {row?.product_name}
                    </TableCell>
                    <TableCell align="left" style={{ width: "10%" }}>
                      {row?.price} сом
                    </TableCell>

                    <TableCell align="left" style={{ width: "10%" }}>
                      {row?.countOld} кг
                    </TableCell>
                    <TableCell align="left" style={{ width: "10%" }}>
                      <div className="countsBlock">
                        <input
                          type="text"
                          onChange={(e) => onChangeCount(e, row)}
                          value={row?.count}
                          maxLength={10}
                          className="counts"
                          // readOnly={!checkInvoice}
                        />
                        <div>
                          {row?.count != row?.countOld && (
                            <Tooltip
                              title={"Кол-во не сходится"}
                              placement="right-start"
                            >
                              <ErrorOutlineIcon
                                sx={{ color: "rgba(228, 30, 30, 0.719)" }}
                              />
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="left" style={{ width: "15%" }}>
                      {activeInvoice?.date_from}
                    </TableCell>
                    <TableCell align="left" style={{ width: "15%" }}>
                      {activeInvoice?.date_to}
                    </TableCell>
                  </TableRow>
                ))}
                {/* <TableRow>
            <TableCell colSpan={2} align="left" className="footerTable">
              Итого
            </TableCell>
            <TableCell align="left" className="footerTable">
              {totalSum(listProduction, "count", "price")} сом
            </TableCell>
            <TableCell
              colSpan={3}
              align="left"
              style={{ fontWeight: "bold" }}
            >
              {sumCountsFN(listProduction, "count")} шт (кг)
            </TableCell>
          </TableRow> */}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default ListData;

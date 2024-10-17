import { ru } from "date-fns/locale";

////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import { Table, TableBody, TableCell, Tooltip } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import DatePicker from "react-datepicker";

////// fns
import { setListProduction } from "../../../../store/reducers/productionSlice";
import { setActiveDate } from "../../../../store/reducers/productionSlice";
import { getListProdProduction } from "../../../../store/reducers/productionSlice";

////// style
import "./style.scss";

////// helpers
import { transformActionDate } from "../../../../helpers/transformDate";
import { reverseTransformActionDate } from "../../../../helpers/transformDate";

////// icons
import GeneratePdf from "../GeneratePdf/GeneratePdf";

const HistoryData = () => {
  const dispatch = useDispatch();

  const [activeInvoice, setActiveInvoice] = useState({});

  const { activeDate } = useSelector((state) => state.productionSlice);
  const { listProduction, listProductionInvoice } = useSelector(
    (state) => state.productionSlice
  );

  const onChangeDate = (item) => {
    dispatch(setActiveDate(transformActionDate(item)));
    const obj = {
      date_from: transformActionDate(item),
      date_to: "",
      setActiveInvoice,
    };
    dispatch(getListProdProduction(obj));
  };

  const clickInvoice = (item) => {
    dispatch(setListProduction(item?.products));
    setActiveInvoice(item);
  };

  useEffect(() => {
    const obj = { date_from: activeDate, date_to: "", setActiveInvoice };
    dispatch(getListProdProduction(obj));
  }, []);

  return (
    <div div className="productionData productionHisotry">
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
            <div className="date">
              <DatePicker
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
                  <TableCell style={{ width: "35%" }}>Продукт</TableCell>
                  <TableCell align="left" style={{ width: "10%" }}>
                    Цена
                  </TableCell>
                  <TableCell align="left" style={{ width: "10%" }}>
                    Кол-во
                  </TableCell>
                  <TableCell align="left" style={{ width: "10%" }}>
                    Выпущено
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
                      {row?.change} кг
                    </TableCell>
                    <TableCell align="left" style={{ width: "10%" }}>
                      {row?.count} кг
                    </TableCell>
                    <TableCell align="left" style={{ width: "15%" }}>
                      {row?.date_from}
                    </TableCell>
                    <TableCell align="left" style={{ width: "15%" }}>
                      {row?.date_to}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default HistoryData;

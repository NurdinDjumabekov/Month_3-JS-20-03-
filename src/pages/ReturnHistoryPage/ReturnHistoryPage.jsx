/////// hooks
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/////// components
import NavMenu from "../../common/NavMenu/NavMenu";
import { BottomSheet } from "react-spring-bottom-sheet";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

/////// fns

////// helpers
import { listInvReturn, listProdsReturn } from "../../helpers/LocalData";
import { roundingNum } from "../../helpers/totals";

////// style
import "./style.scss";

const ReturnHistoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [look, setLook] = useState(false);

  useEffect(() => {}, []);

  const objType = {
    0: { text: "Ожидание", color: "red" },
    1: { text: "В наличии", color: "red" },
    2: { text: "Отгружено в цех", color: "green" },
  };

  const lookInvoice = () => {
    setLook(true);
  };

  return (
    <>
      <NavMenu navText={"История возврата товара"} />
      <div className="returnHistoryPage">
        <div className="listBlock">
          {listInvReturn?.map((item, index) => (
            <button className="invoiceParent" onClick={lookInvoice}>
              <div className="invoiceParent__inner">
                <div className="mainData">
                  <p className="indexNums">{index + 1}</p>
                  <div>
                    <p className="role">{item?.agent}</p>
                    <p className="titleDate">{item.date}</p>
                  </div>
                </div>
                {!!item?.comment ? (
                  <p className="comments">{item.comment}</p>
                ) : (
                  <p className="comments"> ...</p>
                )}
              </div>
              <div className="mainDataArrow">
                <div>
                  <p style={{ color: "checkStyle?.color" }}>
                    {"Отгружено в цех"}
                  </p>
                  <span className="totalPrice">
                    {roundingNum(item?.total_price)} сом
                  </span>
                </div>
                <div className="arrow"></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomSheet
        open={look}
        onDismiss={() => setLook(false)}
        defaultSnap={({ maxHeight }) => maxHeight * 0.9}
        snapPoints={({ maxHeight }) => maxHeight * 0.9}
      >
        <div className="listProdCRUD_SI leftoversPage__table h100">
          <TableContainer
            component={Paper}
            sx={{ maxHeight: "100%" }}
            className="scroll_table standartTable"
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "46%" }}>Продукт</TableCell>
                  <TableCell align="left" style={{ width: "18%" }}>
                    Кг
                  </TableCell>
                  <TableCell align="left" style={{ width: "18%" }}>
                    Шт
                  </TableCell>
                  <TableCell align="left" style={{ width: "18%" }}>
                    Цена
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listProdsReturn?.map((row) => (
                  <TableRow key={row?.product_guid}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "46%" }}
                    >
                      {row?.product_name}
                    </TableCell>
                    <TableCell align="left" style={{ width: "18%" }}>
                      {row?.amount}
                    </TableCell>
                    <TableCell align="left" style={{ width: "18%" }}>
                      {row?.amount_per}
                    </TableCell>
                    <TableCell align="left" style={{ width: "18%" }}>
                      {row?.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </BottomSheet>
    </>
  );
};

export default ReturnHistoryPage;

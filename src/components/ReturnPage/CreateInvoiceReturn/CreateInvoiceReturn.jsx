//// hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

///// fns

///// components
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import { BottomSheet } from "react-spring-bottom-sheet";

////// style
import "./style.scss";
import { useEffect } from "react";

const CreateInvoiceReturn = ({ create, setCreate }) => {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <div className="createInvoiceReturn">
      <BottomSheet
        open={create}
        onDismiss={() => setCreate(false)}
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
                {[]?.map((row) => (
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
    </div>
  );
};

export default CreateInvoiceReturn;

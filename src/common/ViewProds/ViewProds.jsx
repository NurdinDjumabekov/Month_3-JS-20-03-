import React from "react";

////// components
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

////// style
import "./style.scss";

///// helpers
import { roundingNum } from "../../helpers/totals";

const ViewProds = (props) => {
  const { list, keys } = props;
  const { name, count_kg, count, price } = keys;
  const { total_count_kg, total_count, total_price } = keys;

  return (
    <div className="viewProds">
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "100%" }}
        className="scroll_table standartTable"
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "5%", padding: 2 }}>№</TableCell>
              <TableCell style={{ width: "41%", padding: 5 }}>Товары</TableCell>
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
            {list?.map((row, index) => (
              <TableRow key={row?.product_guid}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ width: "5%", textAlign: "center" }}
                >
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row" style={{ width: "41%" }}>
                  {row?.[name]}
                </TableCell>
                <TableCell align="left" style={{ width: "18%" }}>
                  {roundingNum(+row?.[count_kg])}
                </TableCell>
                <TableCell align="left" style={{ width: "18%" }}>
                  {roundingNum(+row?.[count])}
                </TableCell>
                <TableCell align="left" style={{ width: "18%" }}>
                  {roundingNum(+row?.[price])}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableRow className="footereTable">
            <TableCell colSpan={2} align="left">
              Итого
            </TableCell>
            <TableCell align="left">
              {roundingNum(+list?.[0]?.[total_count_kg])}
            </TableCell>
            <TableCell align="left">
              {roundingNum(+list?.[0]?.[total_count])}
            </TableCell>
            <TableCell align="left">
              {roundingNum(+list?.[0]?.[total_price])}
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewProds;

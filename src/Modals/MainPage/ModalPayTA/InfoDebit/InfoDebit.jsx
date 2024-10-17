////// hooks
import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

////// components
import { Table, TableBody, TableCell, Tooltip } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import { sumByKey } from "../../../../helpers/totals";

const InfoDebit = ({ debtEveryTA }) => {
  return (
    <div className="infoDebit">
      <div className="dolg">
        <h5>Долги</h5>
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
                  <TableCell align="left" style={{ width: "15%" }}>
                    ФИО
                  </TableCell>
                  <TableCell align="left" style={{ width: "15%" }}>
                    Дата начисления
                  </TableCell>
                  <TableCell align="left" style={{ width: "15%" }}>
                    Сумма
                  </TableCell>
                  <TableCell align="left" style={{ width: "15%" }}>
                    Комментарий
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {debtEveryTA?.dolg?.map((row) => (
                  <TableRow key={row?.invoice_guid}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "5%" }}
                      align="center"
                    >
                      {row?.invoice_codeid}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "15%" }}
                    >
                      {row?.agent_fio}
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
                      {row?.amount} сом
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
                <TableRow>
                  <TableCell
                    colSpan={3}
                    align="left"
                    className="footerTable"
                    style={{ paddingLeft: 20 }}
                  >
                    Итого
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    align="left"
                    style={{ fontWeight: "bold" }}
                  >
                    {sumByKey(debtEveryTA?.dolg, "amount")} сом
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="vozvrat">
        <h5>Возврат</h5>
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
                  <TableCell align="left" style={{ width: "15%" }}>
                    ФИО
                  </TableCell>
                  <TableCell align="left" style={{ width: "15%" }}>
                    Дата начисления
                  </TableCell>
                  <TableCell align="left" style={{ width: "15%" }}>
                    Сумма
                  </TableCell>
                  <TableCell align="left" style={{ width: "15%" }}>
                    Комментарий
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {debtEveryTA?.vozvrat?.map((row, index) => (
                  <TableRow key={index}>
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
                      style={{ width: "15%" }}
                    >
                      {row?.agent_fio}
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
                      {row?.amount} сом
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "15%" }}
                    >
                      ...
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} align="left" className="footerTable">
                    Итого
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    align="left"
                    style={{ fontWeight: "bold" }}
                  >
                    {sumByKey(debtEveryTA?.vozvrat, "amount")} сом
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

export default InfoDebit;

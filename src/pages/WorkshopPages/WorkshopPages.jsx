//////// hooks
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// fns

////// icons

////// helpers

/////// components
import MyInvoicePage from "./MyInvoicePage/MyInvoicePage";
import ViewProdsPage from "./ViewProdsPage/ViewProdsPage";
import ReturnHistoryPage from "../ReturnsPages/ReturnHistoryPage/ReturnHistoryPage";
import ActionsInvoicePage from "./ActionsInvoicePage/ActionsInvoicePage";
import PayInWhPage from "./PayInWhPage/PayInWhPage";
import HistoryPayPage from "./HistoryPayPage/HistoryPayPage";

const WorkshopPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<WorkshopPages />} />
        <Route path="main" element={<ActionsInvoicePage />} />
        <Route path="history_accept" element={<MyInvoicePage />} />
        <Route path="history_return" element={<ReturnHistoryPage />} />
        <Route path="view" element={<ViewProdsPage />} />
        <Route path="pay" element={<PayInWhPage />} />
        <Route path="pay_history" element={<HistoryPayPage />} />
      </Routes>
    </>
  );
};

export default WorkshopPages;

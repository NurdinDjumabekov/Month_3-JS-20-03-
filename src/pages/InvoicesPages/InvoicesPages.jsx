//////// hooks
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// fns

////// icons

////// helpers

/////// components
import MyInvoicePage from "./MyInvoicePage/MyInvoicePage";
import SenderInvoicePage from "./SenderInvoicePage/SenderInvoicePage";
import AcceptInvoicePage from "./AcceptInvoicePage/AcceptInvoicePage";
import ViewProdsPage from "./ViewProdsPage/ViewProdsPage";

const InvoicesPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<InvoicesPages />} />
        <Route path="main" element={<MyInvoicePage />} />
        <Route path="view" element={<ViewProdsPage />} />

        {/* <Route path="accept_invoice" element={<AcceptInvoicePage />} />
        <Route path="send_invoice" element={<SenderInvoicePage />} /> */}
      </Routes>
    </>
  );
};

export default InvoicesPages;

//////// hooks
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// fns

////// icons

////// helpers

/////// components
import ReturnHistoryPage from "./ReturnHistoryPage/ReturnHistoryPage";
import ReturnProdsPage from "./ReturnProdsPage/ReturnProdsPage";
import ReturnCreatePage from "./ReturnCreatePage/ReturnCreatePage";
import AcceptInvoiceReturnPage from "./AcceptInvoiceReturnPage/AcceptInvoicePage";
import SenderInvoiceReturnPage from "./SenderInvoiceReturnPage/SenderInvoiceReturnPage";

const ReturnsPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<ReturnsPages />} />
        <Route path="history" element={<ReturnHistoryPage />} />
        <Route path="create" element={<ReturnCreatePage />} />
        <Route path="send_invoice" element={<SenderInvoiceReturnPage />} />
        <Route path="accept_invoice" element={<AcceptInvoiceReturnPage />} />
        {/* <Route path="prods" element={<ReturnProdsPage />} /> delete */}
      </Routes>
    </>
  );
};

export default ReturnsPages;
// ReturnHistoryPage

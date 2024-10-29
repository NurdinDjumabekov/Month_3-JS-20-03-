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

const InvoicesPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<InvoicesPages />} />
        <Route path="main" element={<MyInvoicePage />} />
        <Route path="view" element={<ViewProdsPage />} />
      </Routes>
    </>
  );
};

export default InvoicesPages;

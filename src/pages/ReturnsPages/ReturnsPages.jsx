//////// hooks
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// fns

////// icons

////// helpers

/////// components
import ReturnHistoryPage from "./ReturnHistoryPage/ReturnHistoryPage";
import ReturnCreatePage from "./ReturnCreatePage/ReturnCreatePage";

const ReturnsPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<ReturnsPages />} />
        <Route path="history" element={<ReturnHistoryPage />} />
        <Route path="create" element={<ReturnCreatePage />} />
      </Routes>
    </>
  );
};

export default ReturnsPages;
// ReturnHistoryPage

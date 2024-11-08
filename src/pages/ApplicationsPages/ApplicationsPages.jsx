//////// hooks
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/////// components
import MainPage from "../MainPage/MainPage";
import CreateInvoicePage from "./CreateInvoicePage/CreateInvoicePage";
import InputInvoicePage from "./InputInvoicePage/InputInvoicePage";

const ApplicationsPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<ApplicationsPages />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/crud_invoice" element={<CreateInvoicePage />} />
      <Route path="/input_prods" element={<InputInvoicePage />} />
    </Routes>
  );
};

export default ApplicationsPages;
/// <Autocomplete isLoaded={isLoaded} onPlaceSelect={setCenter} />
/// AIzaSyD8hB-KDvF4vITv4idoxn2DqqMdJffJGd8
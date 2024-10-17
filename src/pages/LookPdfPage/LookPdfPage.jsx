import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";

const LookPdfPage = () => {
  const { url } = useParams();

  return (
    <div className="pdfViewer">
      <iframe
        src={url}
        width="100%"
        height="100%"
        // title="PDF Viewer"
        // style={{ border: "none" }}
      />
    </div>
  );
};

export default LookPdfPage;

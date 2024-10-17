import React, { useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

/////// components
import ViewPhotos from "../../components/CameraPage/Modals/ViewPhotos/ViewPhotos";
import Webcam from "react-webcam";

/////// style
import "./style.scss";

////// icons
import restart from "../../assets/icons/arrow-repeat.svg";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

////// fns
import { getListPhotos, sendPhotos } from "../../store/reducers/photoSlice";

const CameraPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { route_guid, guid_point } = useParams();

  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);

  const [cameraFront, setCameraFront] = useState(true);
  const [viewPhotos, setViewPhotos] = useState(false);
  const [animation, setAnimation] = useState(false);

  const { dataSave } = useSelector((state) => state.saveDataSlice);

  const createPhoto = useCallback(() => {
    setAnimation(true);
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // Преобразуем base64 в файл PNG
      const file = base64ToFile(imageSrc, "photo.png");

      if (file) {
        const formData = new FormData();
        formData?.append("agent_guid", dataSave?.guid);
        formData?.append("point_guid", guid_point);
        formData?.append("route_guid", route_guid);
        formData?.append("file", file);
        dispatch(sendPhotos({ data: formData }));
      }
    }

    setTimeout(() => {
      setAnimation(false);
    }, 200);
  }, [webcamRef, guid_point]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (e) => {
    const files = e?.target?.files;

    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append("agent_guid", dataSave?.guid);
      formData.append("point_guid", guid_point);
      formData.append("route_guid", route_guid);
      formData.append("file", files[0]);
      try {
        await dispatch(sendPhotos({ data: formData })).unwrap();
        console.log("File uploaded successfully");
        e.target.value = null;
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const viewAllPhotos = () => {
    //// открываю модалку для просмотра всех фото
    setViewPhotos(true);
    ///// get  всех фото и видео
    const obj = { guid: dataSave?.guid, guid_point, route_guid };
    dispatch(getListPhotos(obj));
  };

  const prevNav = () => navigate(-1);

  return (
    <div className="cameraPage">
      <div className="cameraPage__inner">
        <div className="loadFiles">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*,video/*"
            onChange={handleFileChange}
            multiple
            style={{ display: "none" }}
          />

          <button className="prev" onClick={prevNav}>
            <ArrowBackIcon sx={{ color: "#222" }} />
          </button>

          <button className="download" onClick={handleButtonClick}>
            <DownloadIcon sx={{ color: "#222" }} />
          </button>
        </div>
        <Webcam
          audio={false} // Отключаем звук, так как мы снимаем только фото
          ref={webcamRef}
          screenshotFormat="image/png"
          videoConstraints={{
            facingMode: cameraFront ? "user" : { exact: "environment" },
          }}
          mirrored={cameraFront} // Отражение фронтальной камеры
        />
      </div>

      <div className="photoSettings">
        <button className="chageCamera" onClick={viewAllPhotos}>
          <RemoveRedEyeIcon sx={{ color: "#fff" }} />
        </button>
        <button onClick={createPhoto} className="createPhoto"></button>
        <button
          onClick={() => setCameraFront(!cameraFront)}
          className="chageCamera"
        >
          <img src={restart} alt="()" />
        </button>
      </div>

      <div className={animation ? "clickPhoto" : ""}></div>
      <ViewPhotos
        viewPhotos={viewPhotos}
        setViewPhotos={setViewPhotos}
        guid_point={guid_point}
        route_guid={route_guid}
      />
    </div>
  );
};

export default CameraPage;

const base64ToBlob = (base64Data, contentType = "image/png") => {
  const byteCharacters = atob(base64Data.split(",")[1]); // Убираем префикс 'data:image/png;base64,'
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};

const base64ToFile = (base64Data, filename) => {
  const blob = base64ToBlob(base64Data);
  return new File([blob], filename, { type: "image/png" });
};

////// hooks
import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

////// icons
import DownloadIcon from "@mui/icons-material/Download";

/////// fns
import { sendPhotos } from "../../../../store/reducers/photoSlice";
import { getListPhotos } from "../../../../store/reducers/photoSlice";

////// helpers
import { myAlert } from "../../../../helpers/MyAlert";

////// components
import ViewActionPhotos from "../ViewActionPhotos/ViewActionPhotos";

const PhotosInfo = ({ props }) => {
  const { point_guid, route_sheet_guid, guid } = props;

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const { listPhotos } = useSelector((state) => state.photoSlice);
  const { dataSave } = useSelector((state) => state.saveDataSlice);

  const getData = () => {
    const obj = { point_guid, guid, route_sheet_guid };
    dispatch(getListPhotos({ ...obj, agent_guid: dataSave?.guid }));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const files = e?.target?.files;

    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append("agent_guid", dataSave?.guid);
      formData.append("point_guid", point_guid);
      formData.append("route_guid", route_sheet_guid);

      // Перебор файлов и добавление каждого файла в formData
      Array.from(files).forEach((file) => {
        formData.append("files", file); // добавляем каждый файл с ключом "files[]"
      });

      // Отправляем данные через dispatch
      const res = await dispatch(sendPhotos({ data: formData })).unwrap();

      if (!!res?.result) {
        const obj = { point_guid, guid, route_sheet_guid };
        dispatch(getListPhotos({ ...obj, agent_guid: dataSave?.guid }));
      } else {
        myAlert("Не удалось загрузить данные!", "error");
      }
    }
  };

  return (
    <div className="mainInfo photosPoint">
      <ViewActionPhotos
        listPhotos={listPhotos}
        getData={getData}
        keyGuid={"guid"}
      />
      <div className="actionsBtnPhoto">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*,video/*"
          onChange={handleFileChange}
          multiple
          style={{ display: "none" }}
        />
        <button className="download" onClick={handleButtonClick}>
          <DownloadIcon sx={{ color: "#222" }} />
        </button>
      </div>
    </div>
  );
};

export default PhotosInfo;

////// hooks
import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch } from "react-redux";

////// style
import "./style.scss";

////// icons
import DeleteIcon from "../../../../assets/MyIcons/DeleteIcon";

/////// fns
import { delPhotos } from "../../../../store/reducers/photoSlice";

////// helpers
import { checkIsFile } from "../../../../helpers/validations";
import { myAlert } from "../../../../helpers/MyAlert";

////// components
import ConfirmModal from "../../../../common/ConfirmModal/ConfirmModal";

const ViewActionPhotos = (props) => {
  const { listPhotos, getData, keyGuid, checkDel } = props;

  const dispatch = useDispatch();

  const [modal, setModal] = useState("");

  const clickPhoto = (item) => {
    //// для просмотра каждой фотки
    const imageUrl = item?.file_path;
    if (imageUrl) {
      window.open(imageUrl, "_blank");
    }
  };

  const delPhoto = async () => {
    const res = await dispatch(delPhotos({ guid: modal })).unwrap();
    if (!!res?.result) {
      getData();
      setModal("");
    } else {
      myAlert("Не удалось удалить данные!", "error");
    }
  };

  return (
    <>
      <div className="actionsPhotos">
        {listPhotos?.map((i, index) => (
          <div key={index}>
            {checkIsFile(i?.file_path) === "image" ? (
              <img src={i?.file_path} alt="###" onClick={() => clickPhoto(i)} />
            ) : (
              <div className="videoBlock" onClick={() => clickPhoto(i)}>
                <video controls>
                  <source src={i?.file_path} type="video/mp4" />
                </video>
              </div>
            )}
            {checkDel && (
              <button
                className="delIcon"
                onClick={() => setModal(i?.[keyGuid])}
              >
                <DeleteIcon sx={{ width: 20, height: 20 }} />
              </button>
            )}
          </div>
        ))}
      </div>
      <ConfirmModal
        state={!!modal}
        yesFN={delPhoto}
        noFN={() => setModal("")}
        title={"Удалить ?"}
      />
    </>
  );
};

export default ViewActionPhotos;

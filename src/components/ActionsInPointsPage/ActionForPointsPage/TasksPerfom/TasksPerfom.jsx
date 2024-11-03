////// hooks
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// components
import NavMenu from "../../../../common/NavMenu/NavMenu";
import ViewActionPhotos from "../ViewActionPhotos/ViewActionPhotos";

////// style
import "./style.scss";

////// icons
import DownloadIcon from "@mui/icons-material/Download";

////// fns
import { sendPhotos } from "../../../../store/reducers/photoSlice";
import { updateTasksStatus } from "../../../../store/reducers/pointsSlice";
import { getEveryTasks } from "../../../../store/reducers/pointsSlice";

////// helpers
import { myAlert } from "../../../../helpers/MyAlert";
import { transformDateTime } from "../../../../helpers/transformDate";

/// выполнение таска
const TasksPerfom = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { guid, checkEdit } = location.state;
  //   const { comment, point_guid, filesUser } = location.state;
  //   const { status, filesAgent, comment_agent } = location.state;

  const [comments, setComments] = useState("");

  const { dataSave } = useSelector((state) => state.saveDataSlice);
  const { everyTasks } = useSelector((state) => state.pointsSlice);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const files = e?.target?.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append("agent_guid", dataSave?.guid);
      formData.append("point_guid", everyTasks?.point_guid);
      formData.append("task_guid", guid);
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
      const res = await dispatch(sendPhotos({ data: formData })).unwrap();
      if (!!res?.result) {
        getData();
      } else {
        myAlert("Не удалось загрузить данные!", "error");
      }
    }
  };

  const getData = () => dispatch(getEveryTasks(guid));

  useEffect(() => {
    getData();
    setComments(everyTasks?.comment_agent);
  }, [everyTasks?.comment_agent]);

  const saveTask = async () => {
    if (!!!comments) {
      myAlert("Заполните комментарий", "error");
    }
    const data = {
      task_guid: guid,
      comment_agent: comments,
      status: 2,
    };
    const res = await dispatch(updateTasksStatus({ data })).unwrap();

    if (!!res?.result) {
      getData();
      navigate(-1);
    }
  };

  console.log(checkEdit, "checkEdit");
  return (
    <>
      <NavMenu navText={"Задание от руководителя"} />
      <div className="tasksPerfom">
        <div className="tasksPerfom__inner">
          <h1>{everyTasks?.comment}</h1>
          <div className="list">
            <ViewActionPhotos
              listPhotos={everyTasks?.filesUser}
              getData={getData}
              keyGuid={"guid_file"}
              checkDel={false}
            />
          </div>
        </div>

        <div className="sendData">
          <textarea
            onChange={(e) => setComments(e.target.value)}
            value={comments}
          ></textarea>
          <div className="list">
            <ViewActionPhotos
              listPhotos={everyTasks?.filesAgent}
              getData={getData}
              keyGuid={"guid_file"}
              checkDel={checkEdit}
            />
          </div>
        </div>

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

        <button className="startEndTA saveTask" onClick={saveTask}>
          <p>+ Сохранить</p>
        </button>
      </div>
    </>
  );
};

export default TasksPerfom;

/////// hooks
import { useState } from "react";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

///// fns
import { getTasks } from "../../store/reducers/pointsSlice";

////// style
import "./style.scss";

////// components
import { useDropzone } from "react-dropzone";
import NavMenu from "../../common/NavMenu/NavMenu";
import SendInput from "../../common/SendInput/SendInput";
import Modals from "../../components/Modals/Modals";

////// icons
import ArrowNav from "@mui/icons-material/ArrowForwardIosSharp";
import AddIcon from "../../assets/MyIcons/AddIcon";
import DeleteIcon from "../../assets/MyIcons/DeleteIcon";

/////// helpers
import { myAlert } from "../../helpers/MyAlert";

const TasksPage = () => {
  const dispatch = useDispatch();

  const { dataSave } = useSelector((state) => state.saveDataSlice);
  const { listsTasks } = useSelector((state) => state.pointsSlice);

  const { route_guid, guid_point } = useParams();

  const [data, setData] = useState({});
  const [active, setActive] = useState({ comm: "", filesAgent: [] });

  useEffect(() => {
    dispatch(getTasks({ agent_guid: dataSave?.guid, point_guid: guid_point }));
  }, []);

  const moreInfo = (item) => {
    if (item?.status !== 2) {
      setData(item);
    } else {
      myAlert("Задание уже выполнено");
    }
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      setActive({
        ...active,
        filesAgent: [...active.filesAgent, ...acceptedFiles],
      });
    },
    [active, setActive]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  const delFileLocal = (fileToRemove) => {
    const filesAgent = active?.filesAgent?.filter(
      (file) => file !== fileToRemove
    );
    setActive({ ...active, filesAgent });
  };

  const saveDataTasks = () => {
    if (!!!active.comm) return myAlert("Введите текст", "error");

    const send = { task_guid: data?.guid, comment: active?.comm };
  };

  return (
    <>
      <NavMenu navText={"Задания от руководителя"} />
      <div className="tasksPage">
        <div className="tasksPage__lists">
          {listsTasks?.map((item, index) => (
            <button className="invoiceParent" onClick={() => moreInfo(item)}>
              <div className="invoiceParent__inner">
                <div className="mainData">
                  <p className="indexNums">{index + 1}</p>
                  <div>
                    <p className="titleDate role">{item?.user}</p>
                    <p className="titleDate">{item.date}</p>
                  </div>
                </div>
                {!!item?.comment ? (
                  <p className="comments">{item.comment}</p>
                ) : (
                  <p className="comments"> ...</p>
                )}
              </div>
              <div className="mainDataArrow">
                <div>
                  <p>{item?.status_name}</p>
                  <span className="totalPrice"> ...</span>
                </div>
                <div className="arrows">
                  <ArrowNav sx={{ color: "rgba(162, 178, 238, 0.839)" }} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Modals
        openModal={!!data?.codeid}
        closeModal={() => setData({})}
        title={"Информация"}
      >
        <div className="listProdCRUD_SI tasksActions">
          <p>{data?.comment}</p>
          {data?.filesUser?.map((i, index) => (
            <div className="files">
              <a href={i?.file_path} target="_blank">
                Файл {index + 1}
              </a>
            </div>
          ))}
          <button className="send" onClick={() => setActive(data)}>
            <AddIcon width={16} height={16} color={"#fff"} />
            <p>Выполнить задание</p>
          </button>
        </div>
      </Modals>

      <Modals
        openModal={!!active?.codeid}
        closeModal={() => setActive({})}
        title={"Выполнить задания от руководителя"}
      >
        <div className="listProdCRUD_SI tasksActions">
          <SendInput
            value={active?.comm}
            onChange={(e) => setActive({ ...active, comm: e.target.value })}
            title={"Ваш комментарий"}
            name={"comment"}
            type="text"
            typeInput="textarea"
          />

          <div className="inputSend">
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <p>Перетащите сюда файлы или кликните для выбора</p>
            </div>
            <ul>
              {active?.filesAgent?.map((file, index) => (
                <li key={index}>
                  <p>{file?.name}</p>
                  <button onClick={() => delFileLocal(file)}>
                    {/* удаление файла локально */}
                    <DeleteIcon width={19} height={19} color={"red"} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button className="send" onClick={saveDataTasks}>
            <AddIcon width={16} height={16} color={"#fff"} />
            <p>Cохранить</p>
          </button>
        </div>
      </Modals>
    </>
  );
};

export default TasksPage;
//

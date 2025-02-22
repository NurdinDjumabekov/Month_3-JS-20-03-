////// hooks
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

////// icons

/////// fns
import { getTasks } from "../../../../store/reducers/pointsSlice";

////// helpers
import InvoiceComponent from "../../../../common/InvoiceComponent/InvoiceComponent";

////// components

const TasksInfo = ({ props, reportEveryTT }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { point_guid } = props;

  const { dataSave } = useSelector((state) => state.saveDataSlice);
  const { listsTasks } = useSelector((state) => state.pointsSlice);

  useEffect(() => {
    dispatch(getTasks({ agent_guid: dataSave?.guid, point_guid }));
  }, [point_guid]);

  const clickInvoice = (item) => {
    const checkEdit = !!!reportEveryTT?.end_time && !!reportEveryTT?.start_time;

    navigate("/points/tasks_perform", { state: { ...item, checkEdit } });
  };

  const objTypeInvoice = {
    0: { text: "Ожидание", color: "red" },
    1: { text: "Ожидание", color: "red" },
    2: { text: "Выполнено", color: "green" },
  };

  return (
    <div className="mainInfo tasksPoint">
      <div className="tasksPoint__inner">
        {listsTasks?.length == 0 ? (
          <div className="emptyList">
            <p>Задания от руководителя на сегодня отсутствуют ...</p>
          </div>
        ) : (
          <>
            {listsTasks?.map((item, index) => (
              <InvoiceComponent
                item={item}
                index={index}
                objRole={{}}
                clickInvoice={clickInvoice}
                objStatus={objTypeInvoice}
                title={"1"}
                key={index}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TasksInfo;

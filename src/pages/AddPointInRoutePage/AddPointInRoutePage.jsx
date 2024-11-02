////// hooks
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// fns
import { setInfoNextpoint } from "../../store/reducers/pointsSlice";
import { addNewPontToday } from "../../store/reducers/pointsSlice";
import { clearInfoNextpoint } from "../../store/reducers/pointsSlice";
import { getPointsRouteAgent } from "../../store/reducers/mapSlice";
import { getListRoutes_TA } from "../../store/reducers/mapSlice";

///// components
import Select from "react-select";
import NavMenu from "../../common/NavMenu/NavMenu";

////// icons
import AddIcon from "../../assets/MyIcons/AddIcon";

////// helpers
import { transformLists } from "../../helpers/transformLists";
import { transformActionDate } from "../../helpers/transformDate";

////// style
import "./style.scss";
import { myAlert } from "../../helpers/MyAlert";

const AddPointInRoutePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listPointsEveryTA } = useSelector((state) => state.mapSlice);
  const { activeRouteList } = useSelector((state) => state.photoSlice);
  const { everyRoutes_TA } = useSelector((state) => state.mapSlice);
  const { infoNextpoint } = useSelector((state) => state.pointsSlice);
  const { guid, user_type } = useSelector(
    (state) => state.saveDataSlice?.dataSave
  );

  const listPoints = transformLists(listPointsEveryTA, "guid", "text");
  const list = everyRoutes_TA?.map((i, inx) => ({ ...i, id: inx }))?.slice(1);
  const listRoute = transformLists(list, "id", "id");

  const onChangeCom = ({ target: { name, value } }) => {
    dispatch(setInfoNextpoint({ ...infoNextpoint, [name]: value }));
  };

  const onChange = (item, { name }) => {
    dispatch(setInfoNextpoint({ ...infoNextpoint, [name]: item }));
  };

  useEffect(() => {
    dispatch(getPointsRouteAgent({ guid, first: false }));

    const obj = { agent_guid: guid, user_type };
    const activeDate = transformActionDate(new Date());
    dispatch(getListRoutes_TA({ ...obj, activeDate }));
    //// get список марщрутов чтобы узнать сколько позиций у ТА (сколько тт он должен проехать)

    return () => dispatch(clearInfoNextpoint());
  }, []);

  const addPointToday = async () => {
    if (!!!infoNextpoint?.point?.value) {
      myAlert("Заполните 'Список ваших торговых точек'", "error");
      return;
    }

    const data = {
      point_guid: infoNextpoint?.point?.value,
      comment: infoNextpoint?.comment,
      position: infoNextpoint?.position?.value || 1,
      route_sheet_guid: activeRouteList?.guid,
      navigate,
    };
    const res = await dispatch(addNewPontToday(data)).unwrap();
    /// добавляю новую точку на сегодня от имени ТА
    if (res == 1) {
      myAlert("Новый маршрут был построен");
      navigate(-1);
    } else {
      myAlert("Маршрут с такой точкой уже построен!", "error");
    }
  };

  return (
    <>
      <NavMenu navText={"Добавить точку в свой маршрут"} />
      <div className="addPointInRoutePage">
        <div className="myInputs">
          <h6>Список ваших торговых точек</h6>
          <Select
            options={listPoints}
            className="select"
            onChange={onChange}
            value={infoNextpoint?.point}
            name="point"
          />
        </div>

        <div className="myInputs">
          <h6>Выберите очередь для новой точки</h6>
          <Select
            options={listRoute}
            className="select"
            onChange={onChange}
            name="position"
            value={infoNextpoint?.position}
          />
        </div>

        <textarea
          type="text"
          onChange={onChangeCom}
          value={infoNextpoint?.comment}
          name="comment"
          placeholder="Комментарий (Описание для админа)"
        />

        <button className="sendData" onClick={addPointToday}>
          <AddIcon width={16} height={16} color={"#fff"} />
          <p>Добавить точку на сегодня</p>
        </button>
      </div>
    </>
  );
};

export default AddPointInRoutePage;

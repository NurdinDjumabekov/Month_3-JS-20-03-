//////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

////// styles
import "./style.scss";

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";

////// fns
import { getListRoutes_TA } from "../../../store/reducers/mapSlice";
import { getEveryRoutes_TA } from "../../../store/reducers/mapSlice";
import { createInvoice } from "../../../store/reducers/standartSlice";
import { activeSlideFN } from "../../../store/reducers/standartSlice";

///// icons
import arrow from "../../../assets/icons/arrowNav.svg";
import searchIcon from "../../../assets/icons/searchIcon.png";
import krest from "../../../assets/icons/krestBlack.svg";

////// helpers
import { getMyLocation } from "../../../helpers/GetMyGeo";

const PointLists = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { everyRoutes_TA } = useSelector((state) => state.mapSlice);
  const { dataSave } = useSelector((state) => state.saveDataSlice);
  const filter_list_old = everyRoutes_TA?.filter((i) => !!i?.guid);

  const [search, setSearch] = useState("");

  const getData = async () => {
    const guid = await dispatch(getListRoutes_TA(dataSave?.guid)).unwrap();
    if (!!guid) {
      getMyLocation()
        .then(({ lat, lng }) => {
          const myGeo = { lat, lng };
          dispatch(getEveryRoutes_TA({ route_sheet_guid: guid, myGeo }));
        })
        .catch(({ lat, lng }) => {
          const myGeo = { lat, lng };
          dispatch(getEveryRoutes_TA({ route_sheet_guid: guid, myGeo }));
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const filter_list = filter_list_old?.filter((i) =>
    i?.point?.toLowerCase()?.includes(search?.toLowerCase())
  );

  const clear = () => setSearch("");

  const onChangeSearch = (e) => setSearch(e.target.value);

  const checkLength = search?.length === 0;

  const clickPoint = async (position) => {
    //// создание накладной возврата
    const send = {
      sender_guid: dataSave?.guid, // guid отпровителя
      sender_type: 1,
      reciever_guid: position?.point_guid, // guid получателя
      reciever_type: 4, // для тт
      user_guid: dataSave?.guid, // guid человека кто создает
      user_type: 1,
      comment: "Возврат накладной",
      invoice_type: 4, // накладная возврата
      route_guid: position?.guid,
    };

    const returns = await dispatch(createInvoice(send)).unwrap();
    if (!!returns?.result) {
      //// создание отпускной возврата
      const data = {
        sender_guid: dataSave?.guid, // guid отпровителя
        sender_type: 1,
        reciever_guid: position?.point_guid, // guid получателя
        reciever_type: 4, // для тт
        user_guid: dataSave?.guid, // guid человека кто создает
        user_type: 1,
      };

      const res = await dispatch(createInvoice(data)).unwrap();

      if (!!res?.result) {
        const return_guid = returns?.invoice_guid;
        const send_guid = res?.invoice_guid;
        const sendData = { ...position, return_guid, send_guid };
        dispatch(activeSlideFN()); /// обнуляю слайдер, чтобы отображался самый первый
        navigate("/points/actions", { state: sendData });
      }
    }
  };

  console.log(filter_list, "filter_list");

  return (
    <div className="pointListsMain">
      <NavMenu>
        <div className="sarchBlock">
          <button className="arrow" onClick={() => navigate(-1)}>
            <img src={arrow} alt="<" />
          </button>
          <form className="search" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Поиск точек ..."
              className="searchHeader"
              onChange={onChangeSearch}
              value={search}
            />
            <button className="shadowSearch" type="submit"></button>
          </form>
          {checkLength ? (
            <button className="searchIcon">
              <img src={searchIcon} alt="<" />
            </button>
          ) : (
            <button className="searchIcon" onClick={clear}>
              <img src={krest} alt="<" />
            </button>
          )}
        </div>
      </NavMenu>
      <div className="pointLists">
        <div className="pointLists__inner ">
          <div className="pointLists__list">
            {filter_list?.map((item) => (
              <div
                className="every"
                key={item.guid}
                onClick={() => clickPoint(item)}
              >
                <div
                  className={`logo ${!!item?.result ? "visit" : "no_visit"}`}
                >
                  <p>{getFirstLetter(item?.point)}</p>
                </div>
                <div className="content">
                  <div>
                    <p>{item?.point}</p>
                    <span>{item?.result || "Не посетил точку"}</span>
                  </div>
                  <div>
                    <p>{item?.start_time || "00:00"}</p>
                    <span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointLists;

function getFirstLetter(text) {
  return text?.trim()?.charAt(0) || "";
}

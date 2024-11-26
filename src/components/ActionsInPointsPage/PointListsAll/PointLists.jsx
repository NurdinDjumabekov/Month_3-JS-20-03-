//////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

////// styles
import "./style.scss";

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";

////// fns
import { getListTT } from "../../../store/reducers/standartSlice";

///// icons
import arrow from "../../../assets/icons/arrowNav.svg";
import searchIcon from "../../../assets/icons/searchIcon.png";
import krest from "../../../assets/icons/krestBlack.svg";

////// helpers

const PointListsAll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listAllPointsTA } = useSelector((state) => state.standartSlice);
  const { dataSave } = useSelector((state) => state.saveDataSlice);

  const filter_list_old = listAllPointsTA?.filter((i) => !!i?.guid);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getListTT(dataSave.guid));
  }, []);

  const filter_list = filter_list_old?.filter((i) =>
    i?.text?.toLowerCase()?.includes(search?.toLowerCase())
  );

  const clear = () => setSearch("");

  const onChangeSearch = (e) => setSearch(e.target.value);

  const checkLength = search?.length === 0;

  const clickPoint = ({ guid, text }) => {
    const obj = { point: text, point_guid: guid };
    navigate("/points/history", { state: obj });
  };

  return (
    <div className="pointListsMain allPoints">
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
            {filter_list?.map((item, index) => (
              <div
                className="every"
                key={item.guid}
                onClick={() => clickPoint(item)}
              >
                <div
                  className={`logo ${!!item?.result ? "visit" : "no_visit"}`}
                >
                  {/* <p>{getFirstLetter(item?.text)}</p> */}
                  <p>{index + 1}</p>
                </div>
                <div className="content">
                  <div>
                    <p>{item?.text}</p>
                    <b>Долг: {item?.balance} сом</b>
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

export default PointListsAll;

function getFirstLetter(text) {
  return text?.trim()?.charAt(0) || "";
}

/////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/////// components
import NavMenu from "../../../common/NavMenu/NavMenu";

////// style
import "./style.scss";

import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

////// icons
import mapIcon from "../../../assets/images/free-icon-map-854878.png";
import mapIcon2 from "../../../assets/images/map_11515753.png";
import mapIcon3 from "../../../assets/images/distance_11515677.png";

const PointsMainPage = () => {
  const list = [
    { codeid: 1, name: "Список всех торговых точек", img: mapIcon },
    {
      codeid: 2,
      name: "Торговые точки на сегодня",
      more: "карта",
      img: mapIcon2,
    },
    {
      codeid: 3,
      name: "Торговые точки на сегодня",
      more: "список",
      img: mapIcon3,
    },
  ];

  const data = [
    { x: "Jan", y: 40 },
    { x: "Feb", y: 30 },
    { x: "Mar", y: 20 },
    { x: "Apr", y: 27 },
    { x: "May", y: 18 },
    { x: "Jun", y: 23 },
    { x: "Jul", y: 34 },
    { x: "Aug", y: 56 },
    { x: "Sep", y: 76 },
    { x: "Oct", y: 90 },
    { x: "Nov", y: 150 },
  ];

  return (
    <>
      <NavMenu navText={"Список торговых точек"} />
      <div className="pointsMain">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
        <div className="pointsMain__inner">
          {list?.map((i) => (
            <div className="every">
              <div className="texts">
                <div className="title">
                  <p>
                    {i?.name} {!!i?.more && <>({i?.more})</>}
                  </p>
                </div>
                <span>10+</span>
              </div>
              <div className="icons">
                <img src={i?.img} alt="" />
              </div>
            </div>
          ))}
        </div>
        <div className="graphics">
          <h5>Графики посещений точек</h5>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine
              data={data}
              style={{
                data: { stroke: "#4169E1" },
                parent: { border: "1px solid #ccc" },
              }}
            />
            <VictoryLine
              data={data.map((d) => ({ x: d.x, y: d.y * 1.1 }))}
              style={{
                data: { stroke: "#FF69B4" },
                parent: { border: "1px solid #ccc" },
              }}
            />
          </VictoryChart>
        </div>
      </div>
    </>
  );
};

export default PointsMainPage;

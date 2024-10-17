////// hooks
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

////// components

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

////// style
import "./style.scss";

////// fns
import { setListWorkPlan } from "../../../../store/reducers/mainSlice";

////// icons

const GraphicsEveryTA = () => {
  const dispatch = useDispatch();

  const { listWorkPlan } = useSelector((state) => state.mainSlice);

  const COLORS = ["rgb(216, 56, 56)", "#43e843"];

  // Функция для отображения процентов
  const renderLabel = ({ percent }) => `${(percent * 100).toFixed(0)}%`;

  return (
    <div className="graphicsEveryTA">
      <div className="graphicsEveryTA__inner">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={200} height={200}>
            <Pie
              data={listWorkPlan}
              cy={250} // Центрирование по горизонтали
              cx="50%"
              innerRadius={80} // внутренний радиус для пончиковой диаграммы
              outerRadius={120} // внешний радиус
              fill="#8884d8"
              paddingAngle={3}
              dataKey="value"
              label={renderLabel} // добавляем кастомную функцию для отображения процентов
            >
              {listWorkPlan?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="graphicsEveryTA__info">
          {listWorkPlan?.map((i, index) => (
            <div>
              <div style={{ background: COLORS[index] }}></div>
              <p style={{ color: COLORS[index] }}>
                {i?.name}: {i?.value}%
              </p>
            </div>
          ))}
          {/* <div>
            <div style={{ background: "#d91313" }}></div>
            <p style={{ color: "#d91313" }}>Общий план:</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default GraphicsEveryTA;

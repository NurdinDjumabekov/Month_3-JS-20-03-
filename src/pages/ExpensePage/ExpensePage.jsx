////hooks
import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

/////// fns
import {
  getListExpense,
  getListExpenseTA,
} from "../../store/reducers/stateSlice";

/////// components
import NavMenu from "../../common/NavMenu/NavMenu";

////// style
import "./style.scss";

const ExpensePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { listExpense } = useSelector((state) => state.stateSlice);
  const { dataSave } = useSelector((state) => state.saveDataSlice);

  useEffect(() => {
    dispatch(getListExpense());
    dispatch(getListExpenseTA(dataSave?.guid));
  }, []);

  const length = listExpense?.length == 0;

  return (
    <>
      <NavMenu navText={"Траты"} />
      <div className="expensePage">
        <div className="expensePage__inner">
          {length ? (
            <div className="emptyDataInner">
              <p>Список пустой</p>
            </div>
          ) : (
            <div className="list">
              {listExpense?.map((item) => (
                <div>
                  <div className="mainData">
                    <p>{item?.date}</p>
                    <span>{item?.comment || "..."}</span>
                  </div>
                  <div className="status">
                    <p>Успешно</p>
                    <p>{item?.amount} сом</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExpensePage;

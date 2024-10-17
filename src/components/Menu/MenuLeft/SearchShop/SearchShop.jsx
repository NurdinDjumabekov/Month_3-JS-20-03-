import { useState } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

////// imgs
import logo from "../../../../assets/images/rihaLogo.png";

////// style
import "./style.scss";

////// components
import debounce from "debounce";

////// fns
import { getListTA, searchTA } from "../../../../store/reducers/mainSlice";

const SearchShop = () => {
  const dispatch = useDispatch();

  const { activeDate } = useSelector((state) => state.mainSlice);

  const [search, setSearch] = useState("");

  const handleSearch = useCallback(
    //// поиск товара через запрос
    debounce((value) => {
      dispatch(searchTA(value));
    }, 500),
    []
  );

  const onChange = (e) => {
    const value = e?.target?.value;
    setSearch(value);

    if (value.length === 0) {
      dispatch(getListTA({ first: true, activeDate }));
    } else {
      handleSearch(value);
    }
  };
  return (
    <div className="searchShop">
      {/* <button className="logo">
        <img src={logo} alt="" />
      </button> */}
      <input
        type="text"
        placeholder="Поиск агентов"
        onChange={onChange}
        value={search}
      />
    </div>
  );
};

export default SearchShop;

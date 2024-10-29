////// hooks
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

////// style
import "./style.scss";

////// components
import NavMenu from "../../common/NavMenu/NavMenu";
import debounce from "debounce";
import Select from "react-select";
import ListProds from "../../components/MainPage/ListProds/ListProds";

///// icons
import arrow from "../../assets/icons/arrowNav.svg";
import searchIcon from "../../assets/icons/searchIcon.png";
import krest from "../../assets/icons/krestBlack.svg";
import { useState } from "react";
import {
  setActiveCategs,
  setActiveWorkShop,
} from "../../store/reducers/selectsSlice";
import {
  getListCategs,
  getListProds,
  getListWorkShop,
  searchListProds,
} from "../../store/reducers/mainSlice";

///// components
import ListChoiceProds from "../../common/ListChoiceProds/ListChoiceProds";
import Slider from "react-slick";
import ListAcceptInvoice from "../../components/MainPage/ListAcceptInvoice/ListAcceptInvoice";

///// icons
import colorArrowBtn from "../../assets/icons/colorArrowBtn.svg";

const CreateInvoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const { action, invoice_guid } = location?.state;

  const [currentSlide, setCurrentSlide] = useState(0);

  console.log(currentSlide, "currentSlide");

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: currentSlide == 0 ? <RightBtn /> : <NoneBtn />,
    prevArrow: currentSlide == 1 ? <LeftBtn /> : <NoneBtn />,
    afterChange: (current) => setCurrentSlide(current),
  };

  const [search, setSearch] = useState("");

  const handleSearch = useCallback(
    //// поиск товара через запрос
    debounce((value) => {
      dispatch(searchListProds(value));
    }, 500),
    []
  );

  const prev = () => navigate(-1);

  const clear = () => {
    setSearch("");
    dispatch(getListWorkShop());
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const checkLength = search?.length === 0;

  const onChangeSearch = (e) => {
    const value = e?.target?.value;
    setSearch(value);

    if (value?.length === 0) {
      dispatch(getListWorkShop());
    } else {
      handleSearch(value);
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.blur();
    }
    dispatch(searchListProds(search));
  };

  return (
    <>
      <NavMenu>
        <div className="sarchBlock">
          <button className="arrow" onClick={prev}>
            <img src={arrow} alt="<" />
          </button>
          <form className="search" onSubmit={searchData}>
            <input
              type="text"
              placeholder="Поиск товаров ..."
              className="searchHeader"
              onChange={onChangeSearch}
              value={search}
              ref={inputRef}
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
      <div className="createInvoicePage">
        <Slider {...settings}>
          <ListChoiceProds setSearch={setSearch} search={search} />
          <ListAcceptInvoice />
        </Slider>
      </div>
    </>
  );
};

export default CreateInvoicePage;

function LeftBtn(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} leftBtnPage`} onClick={onClick}>
      <img src={colorArrowBtn} alt=">" />
    </div>
  );
}

function RightBtn(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} rightBtnPage`} onClick={onClick}>
      <img src={colorArrowBtn} alt=">" />
    </div>
  );
}

function NoneBtn(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "green" }}
      onClick={onClick}
    />
  );
}

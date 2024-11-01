////// hooks
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";
import debounce from "debounce";
import ListChoiceProds from "../../../common/ListChoiceProds/ListChoiceProds";
import Slider from "react-slick";
import ListAcceptInvoice from "../../../components/MainPage/ListAcceptInvoice/ListAcceptInvoice";

///// icons
import arrow from "../../../assets/icons/arrowNav.svg";
import searchIcon from "../../../assets/icons/searchIcon.png";
import krest from "../../../assets/icons/krestBlack.svg";
import colorArrowBtn from "../../../assets/icons/colorArrowBtn.svg";

///// fns
import { setActiveWorkShop } from "../../../store/reducers/selectsSlice";
import { searchListProdsNur } from "../../../store/reducers/standartSlice";
import { getListWorkShopsNur } from "../../../store/reducers/standartSlice";
import { getListProdsNur } from "../../../store/reducers/standartSlice";

const CreateInvoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const { action, invoice_guid } = location?.state;

  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: currentSlide == 0 ? <RightBtn /> : <NoneBtn />,
    prevArrow: currentSlide == 1 ? <LeftBtn /> : <NoneBtn />,
    afterChange: (current) => setCurrentSlide(current),
  };

  const getData = async () => {
    const link = ``;
    const res = await dispatch(getListWorkShopsNur({ link })).unwrap();
    // get список цехов
    const guid = res?.[0]?.guid;
    const name = res?.[0]?.name;
    dispatch(setActiveWorkShop({ label: name, value: guid }));
    ///// выбор селекта цехов
    const links = `get_product?workshop_guid=${guid}&type=agent`;
    dispatch(getListProdsNur({ links, guid }));
    // get список товаров с категориями
  };

  useEffect(() => {
    getData();
  }, []);

  const [search, setSearch] = useState("");

  const handleSearch = useCallback(
    //// поиск товара через запрос
    debounce((value) => {
      const link = `get_product?search=${value}&type=agent`;
      dispatch(searchListProdsNur({ link }));
    }, 500),
    []
  );

  const clear = () => {
    setSearch("");
    getData();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onChangeSearch = (e) => {
    const value = e?.target?.value;
    setSearch(value);

    if (value?.length === 0) {
      getData();
    } else {
      handleSearch(value);
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.blur();
    }
    dispatch(searchListProdsNur(search));
  };

  const checkLength = search?.length === 0;

  return (
    <div className="createInvoiceParent">
      <NavMenu>
        <div className="sarchBlock">
          <button className="arrow" onClick={() => navigate(-1)}>
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
          <ListChoiceProds
            setSearch={setSearch}
            search={search}
            invoice_guid={invoice_guid}
            action={action}
          />
          <ListAcceptInvoice invoice_guid={invoice_guid} action={action} />
        </Slider>
      </div>
    </div>
  );
};

export default CreateInvoicePage;

export const LeftBtn = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} leftBtnPage`} onClick={onClick}>
      <img src={colorArrowBtn} alt=">" />
    </div>
  );
};

export const RightBtn = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} rightBtnPage`} onClick={onClick}>
      <img src={colorArrowBtn} alt=">" />
    </div>
  );
};

export const NoneBtn = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "green" }}
      onClick={onClick}
    />
  );
};

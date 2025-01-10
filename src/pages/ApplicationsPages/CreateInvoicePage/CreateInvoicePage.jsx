////// hooks
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";
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
import { confirmInvoiceReq } from "../../../store/reducers/orderSlice";
import { format } from "date-fns";

const CreateInvoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  // console.log(location?.state?.type_point_text, "location");

  const { action, invoice_guid, checkTypeProds, returnCheck } = location?.state;
  const type_unit = location?.state?.type_unit || 2;
  /// 1 - шт, 2 кг

  /// checkTypeProds  - 0 все товары
  /// checkTypeProds  - 1 остатки товара
  /// returnCheck - для подтверждения накладной отпуска

  const [currentSlide, setCurrentSlide] = useState(0);
  const [search, setSearch] = useState("");

  const { dataSave } = useSelector((state) => state.saveDataSlice);

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
    const urlMain = "get_workshop";
    const urlLeftovers = `get_agent_leftover_workshop?agent_guid=${dataSave?.guid}`;
    const link = !!checkTypeProds ? urlLeftovers : urlMain;
    const res = await dispatch(getListWorkShopsNur({ link })).unwrap();
    // get список цехов
    const guid = !!checkTypeProds ? res?.[0]?.workshop_guid : res?.[0]?.guid;
    const name = !!checkTypeProds ? res?.[0]?.workshop_name : res?.[0]?.name;

    if (guid) {
      dispatch(setActiveWorkShop({ label: name, value: guid }));
      ///// выбор селекта цехов
      const urlsMain = `get_product?workshop_guid=${guid}&type=agent`;
      const urlsLeftovers = `get_agent_leftover?agent_guid=${dataSave?.guid}&workshop_guid=${guid}&type=agent`;
      const links = !!checkTypeProds ? urlsLeftovers : urlsMain;
      dispatch(getListProdsNur({ links, guid }));
      // get список товаров с категориями
    }
  };

  useEffect(() => {
    getData();

    return async () => {
      if (location?.state?.type_point_text == "ФТ") {
        /// это нужно только для ФТ
        const send = {
          invoice_guid,
          date_from: format(new Date(), "yyyy-MM-dd HH:mm"),
          date_to: format(new Date(), "yyyy-MM-dd HH:mm"),
          status: 2, // по умолчанию 0, если удаление -1, 1 - потвержден оператором, 2 подтвержден агентом
          user_guid: dataSave?.guid,
          user_type: 1, // 1 agent 2 admin
          user_type1: 1, // 1 agent 2 admin
        };
        dispatch(confirmInvoiceReq(send));
      }
    };
  }, []);

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
  };

  const searchData = (e) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.blur();
    }

    if (search?.length == 0 || search?.length == 1) {
      getData();
    } else {
      const objUrl = {
        0: `get_product?search=${search}&type=agent`,
        1: `get_agent_leftover?search=${search}&type=agent`,
      };
      dispatch(searchListProdsNur({ link: objUrl?.[checkTypeProds] }));
    }
  };

  const checkLength = search?.length === 0;

  return (
    <div className="createInvoiceParent">
      {currentSlide == 0 ? (
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
      ) : (
        <NavMenu navText={"Список выбранных товаров"} />
      )}

      <div className="createInvoicePage">
        <Slider {...settings}>
          <ListChoiceProds
            setSearch={setSearch}
            search={search}
            invoice_guid={invoice_guid}
            action={action}
            type_unit={type_unit}
            checkTypeProds={checkTypeProds}
          />
          <ListAcceptInvoice
            invoice_guid={invoice_guid}
            action={action}
            returnCheck={returnCheck}
          />
        </Slider>
      </div>

      {currentSlide == 0 && (
        <button
          className="searchBottomIcon"
          onClick={() => inputRef?.current?.focus()}
        >
          <img src={searchIcon} alt="0" />
        </button>
      )}
      {currentSlide == 0 && (
        <button className="searchBottomIcon krest" onClick={clear}>
          <img src={krest} alt="x" />
        </button>
      )}
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

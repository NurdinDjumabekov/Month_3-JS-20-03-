import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setDataSave } from "./saveDataSlice";
import { myAlert } from "../../helpers/MyAlert";
import axiosInstance from "../../axiosInstance";
import { setActiveCategs, setActiveWorkShop } from "./selectsSlice";

const { REACT_APP_API_URL } = process.env;

const initialState = {
  listOrders: [], //// список заказов на каждый час
  listTitleOrders: [], //// список итоговых заказов на целый день
  listSendOrders: [], //// временный список для хранения списка заказа ТА
  listsForProduction: {}, //// временный список для хранения ингредиентов
  invoiceInfo: { guid: "", action: 0, listInvoice: [] },
  /// guid заявки и действие 1 - создание, 2 - редактирование, 3 - простое чтение
  activeDate: { date_from: "", date_to: "" },
  // Состояние для диапазона активной недели
};

////// logInAccount - логинизация
export const logInAccount = createAsyncThunk(
  "logInAccount",
  async function (props, { dispatch, rejectWithValue }) {
    const { navigate, data } = props;
    const url = `${REACT_APP_API_URL}/ta/login`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        const { result, guid, fio, user_type, token, phone } = response?.data;
        if (result == 1 && !!guid) {
          const obj = { guid, fio, user_type, token };
          dispatch(setDataSave({ ...obj, phone }));
          navigate("/");
        } else {
          myAlert("Неверный логин или пароль", "error");
        }
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getListWorkShop - get список цехов
export const getListWorkShop = createAsyncThunk(
  "getListWorkShop",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_workshop`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        const obj = response?.data?.[0];
        dispatch(getListCategs(obj)); /// для получение категорий

        const objSort = { value: obj?.guid, label: obj.name };
        dispatch(setActiveWorkShop({ ...obj, ...objSort }));
        ///// подставляю активныый селект в state
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getListCategs - get список категорий
export const getListCategs = createAsyncThunk(
  "getListCategs",
  async function ({ guid }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_category?workshop_guid=${guid}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        const obj = response?.data?.[0];
        dispatch(getListProds({ guid, guidCateg: obj?.category_guid }));
        /// для получение товаров

        const objSort = {
          value: obj?.category_guid,
          label: obj?.category_name,
        };
        dispatch(setActiveCategs({ ...obj, ...objSort }));
        ///// подставляю активный селект в state
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getListProds - get список товаров
export const getListProds = createAsyncThunk(
  "getListProds",
  async function ({ guid, guidCateg }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_product?category_guid=${guidCateg}&workshop_guid=${guid}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// searchListProds - поиск товара в списке товаров
export const searchListProds = createAsyncThunk(
  "searchListProds",
  async function (search, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_product?search=${search}`;

    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getListOrders - список заказов
export const getListOrders = createAsyncThunk(
  "getListOrders",
  async function (props, { dispatch, rejectWithValue }) {
    const { agents_guid, date_from, date_to } = props;
    const url = `${REACT_APP_API_URL}/ta/get_applications`;
    const data = { agents_guid, date_from, date_to };
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(getListTitleOrders(data)); //// get данные целого дня
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getListTitleOrders - список заголовков заказа
export const getListTitleOrders = createAsyncThunk(
  "getListTitleOrders",
  async function (props, { dispatch, rejectWithValue }) {
    const { agents_guid, date_from, date_to } = props;
    const url = `${REACT_APP_API_URL}/ta/get_application_ingredient`;
    const data = { agents_guid, date_from, date_to };
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getEveryDataDay - get список данных целого дня (продукты и ингредиенты)
export const getEveryDataDay = createAsyncThunk(
  "getEveryDataDay",
  async function (props, { dispatch, rejectWithValue }) {
    const { agents_guid, date_from, date_to } = props;
    const url = `${REACT_APP_API_URL}/ta/get_application_titles`;
    const data = { agents_guid, date_from, date_to };
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        // dispatch(createInvoice({ date_from, date_to })); //// check
        return response?.data?.[0];
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getListProdsInInvoice - список товаров определённого заказа
export const getListProdsInInvoice = createAsyncThunk(
  "getListProdsInInvoice",
  async function (guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_application?invoice_guid=${guid}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
); /// checkcheck

////// createInvoice - создание заявок
export const createInvoice = createAsyncThunk(
  "createInvoice",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/create_application`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
); /// checkcheck

////// editInvoice - редактирование и удаление заявок
export const editInvoice = createAsyncThunk(
  "editInvoice",
  async function (props, { dispatch, rejectWithValue }) {
    const { data, agents_guid, activeDate } = props;
    const url = `${REACT_APP_API_URL}/ta/update_application`;
    try {
      const response = await axiosInstance.put(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(getListOrders({ ...activeDate, agents_guid }));
        /// get обновленный список
        if (data?.status == -1) {
          dispatch(setInvoiceInfo({ guid: "", action: 0 })); //// для закрытия модалки добавления
          myAlert("Заявка удалена!");
        }
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    editListAgents: (state, action) => {
      state.listTA = state.listTA?.map((item) =>
        item?.guid === action.payload
          ? { ...item, is_checked: item?.is_checked === 1 ? 0 : 1 }
          : item
      );
    },

    setListTA: (state, action) => {
      state.listTA = state.listTA?.map((item) =>
        item?.guid === action.payload ? { ...item, is_checked: 1 } : item
      );
    },

    ///// очищаю временный список для отправки создания заказа от ТА
    clearListOrders: (state, action) => {
      state.listSendOrders = [];
    },

    ///// очищаю список заказа от ТА
    clearOrders: (state, action) => {
      state.listOrders = [];
    },

    setListProds: (state, action) => {
      state.listProds = action.payload;
    },

    /////изменение ключа count в списке товаров
    changeCountListProds: (state, action) => {
      const { product_guid, count } = action.payload;
      state.listProds = state.listProds?.map((i) =>
        i?.product_guid === product_guid ? { ...i, count } : i
      );
    },

    /////изменение ключа count и checkbox в списке товаров
    changeCountCheckedListProds: (state, action) => {
      const { product_guid, count } = action.payload;
      state.listProds = state.listProds?.map((i) => {
        if (i?.product_guid === product_guid) {
          return { ...i, count, is_checked: count == "" ? false : true };
        } else {
          return i;
        }
      });
    },

    /////изменение ключа count в списке товаров временной корзины
    changeCountOrders: (state, action) => {
      const { product_guid, count } = action.payload;
      state.listSendOrders = state.listSendOrders?.map((i) =>
        i?.product_guid === product_guid ? { ...i, count, my_status: true } : i
      );
    },

    setInvoiceInfo: (state, action) => {
      state.invoiceInfo = action.payload;
    },

    setInvoiceInfoReturn: (state, action) => {
      state.invoiceInfo = { ...state.invoiceInfo, ...action.payload };
    },

    //// меняется активная дата для отображения и сортировки данных
    setActiveDate: (state, action) => {
      state.activeDate = action.payload;
    },

    //// сброс cgeckbox и count в списке
    getDefaultList: (state, action) => {
      state.listProds = state.listProds?.map((i) => ({
        ...i,
        count: "",
        is_checked: false,
      }));
    },
  },

  extraReducers: (builder) => {
    ////////////// logInAccount
    builder.addCase(logInAccount.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(logInAccount.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      myAlert("Неверный логин или пароль");
    });
    builder.addCase(logInAccount.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////// getListWorkShop
    builder.addCase(getListWorkShop.fulfilled, (state, action) => {
      state.preloader = false;
      state.listWorkshop = action.payload;
    });
    builder.addCase(getListWorkShop.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListWorkShop.pending, (state, action) => {
      state.preloader = true;
    });

    //////////////  getListCategs
    builder.addCase(getListCategs.fulfilled, (state, action) => {
      state.preloader = false;
      state.listCategs = action.payload;
    });
    builder.addCase(getListCategs.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListCategs.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////// getListProds
    builder.addCase(getListProds.fulfilled, (state, action) => {
      state.preloader = false;
      state.listProds = action.payload?.map((i) => ({
        ...i,
        count: "",
        is_checked: false,
      }));
    });
    builder.addCase(getListProds.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListProds.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////// searchListProds
    builder.addCase(searchListProds.fulfilled, (state, action) => {
      state.preloader = false;
      state.listProds = action.payload;
    });
    builder.addCase(searchListProds.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(searchListProds.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////// getListOrders
    builder.addCase(getListOrders.fulfilled, (state, action) => {
      state.preloader = false;
      state.listOrders = action.payload?.map((i) => {
        return { ...i, allDay: false, start: i?.date_from };
      });
    });
    builder.addCase(getListOrders.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListOrders.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////// getListTitleOrders
    builder.addCase(getListTitleOrders.fulfilled, (state, action) => {
      state.preloader = false;
      state.listTitleOrders = action.payload?.map((i) => ({
        ...i,
        allDay: true,
        start: i?.date_from,
      }));
    });
    builder.addCase(getListTitleOrders.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListTitleOrders.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////// getEveryDataDay
    builder.addCase(getEveryDataDay.fulfilled, (state, action) => {
      state.preloader = false;
      state.listsForProduction = action.payload;
    });
    builder.addCase(getEveryDataDay.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getEveryDataDay.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////// getListProdsInInvoice
    builder.addCase(getListProdsInInvoice.fulfilled, (state, action) => {
      state.preloader = false;
      state.listSendOrders = action.payload?.map((i) => ({
        ...i,
        my_status: false,
      }));
    });
    builder.addCase(getListProdsInInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      state.listSendOrders = [];
    });
    builder.addCase(getListProdsInInvoice.pending, (state, action) => {
      state.preloader = true;
    });
  },
});

export const {
  editListAgents,
  setListTA,
  clearListOrders,
  changeCountListProds,
  changeCountCheckedListProds,
  setListProds,
  changeCountOrders,
  setInvoiceInfo,
  setInvoiceInfoReturn,
  setActiveDate,
  getDefaultList,
  setListWorkPlan,
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;

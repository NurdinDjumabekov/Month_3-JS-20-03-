import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { myAlert } from "../../helpers/MyAlert";
import axiosInstance from "../../axiosInstance";
import { setActiveCategs, setActiveWorkShop } from "./selectsSlice";
import {
  transformListsProds,
  transformListsProdsEdit,
} from "../../helpers/transformLists";
import { objStatusText } from "../../helpers/objs";
import { setInvoiceInfo } from "./mainSlice";

const { REACT_APP_API_URL } = process.env;

//// SI - send invoice

const initialState = {
  invoiceSendInfo: { seller_guid: "", invoice_guid: "" }, /// seller_guid - ТТ, invoice_guid - накладной
  checkInvoice: true, //// можно ли редактировать накладную
  listWorkshopSI: [],
  listCategsSI: [],
  listProdsSI: [],
  listSendOrdersSI: [], //// временный список для хранения списка заказа ТА
  viewApp: true,
  listInvoice: [],
  listProdEveryInvoice: [],
  listHistoryAcceptInvoice: [], /// история принятых накладынй ТА
  listHistorySendInvoice: [], /// история отпустных накладынй ТА
  listInvoiceReturn: [], /// список накладных возврата
  listProdsReturn: [], /// список товаров возврата
};

////// getListWorkShop - get список цехов
export const getListWorkShop = createAsyncThunk(
  "getListWorkShop",
  async function ({ agent_guid }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_agent_leftover_workshop?agent_guid=${agent_guid}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        const obj = response?.data?.[0];
        dispatch(getListCategs({ guid: obj?.workshop_guid, agent_guid })); /// для получение категорий
        const objSort = {
          value: obj?.workshop_guid,
          label: obj?.workshop_name,
        };
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
  async function ({ guid, agent_guid }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_agent_leftover_category?workshop_guid=${guid}&agent_guid=${agent_guid}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        const obj = response?.data?.[0];
        const data = { guid, guidCateg: obj?.category_guid, agent_guid };
        dispatch(getListProds(data));
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
  async function (props, { dispatch, rejectWithValue }) {
    const { guid, guidCateg, agent_guid } = props;
    const url = `${REACT_APP_API_URL}/ta/get_agent_leftover?agent_guid=${agent_guid}&workshop_guid=${guid}&category_guid=${guidCateg}`;
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

//// createInvoiceSendTT - создания накладной для отпуска ТT
export const createInvoiceSendTT = createAsyncThunk(
  "createInvoiceSendTT",
  async function ({ data, seller_guid }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/create_invoice`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        const invoice_guid = response.data?.invoice_guid;
        dispatch(setInvoiceSendInfo({ seller_guid, invoice_guid }));
        ///// подставляю guid для дальнейшей работы
        /// после запроса откырвается модалка для отправки накладной ТТ
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// createEditProdInInvoiceSI - добавление и редактирование товаров в накладные для отпуска ТТ
export const createEditProdInInvoiceSI = createAsyncThunk(
  "createEditProdInInvoiceSI",
  async function (props, { dispatch, rejectWithValue }) {
    const { forCreate, invoiceInfo, forSendTT, forSelect } = props;

    const { listProdsSI, comment } = forCreate;
    const { action, invoice_guid, route_guid } = invoiceInfo;

    const urlCreate = `${REACT_APP_API_URL}/ta/create_application_product`;
    const urlEdit = `${REACT_APP_API_URL}/ta/update_application_product`;

    const objUrl = { 1: urlCreate, 2: urlEdit }; /// 1 - создание, 2 - редактирование
    const typeReq = { 1: "post", 2: "put" };

    const fnType = {
      1: transformListsProds(listProdsSI),
      2: transformListsProdsEdit(listProdsSI),
    };

    const obj = { invoice_guid, comment, route_guid };
    const data = { ...obj, products: fnType?.[action], status: 0 };

    try {
      const response = await axiosInstance?.[typeReq?.[action]](
        objUrl?.[action],
        data
      );
      if (response.status >= 200 && response.status < 300) {
        if (action == 1) {
          myAlert("Товары добавлены в накладную!");
          dispatch(getListProds(forSelect));
        }
        ///// для get обновленных данных с добавленной заявкой
        dispatch(getListProdsInInvoiceSI(invoice_guid));
        dispatch(getDefaultListSI()); //// очищаю counts всего списка
        if (action == 2) {
          dispatch(sendInvoiceForTT({ data: forSendTT }));
          /// редактирую в нынешнем запросе и сразу меняю статус чтобы накладная оправилась ТТ
        }
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getListProdsInInvoiceSI - список товаров определённой накладной
export const getListProdsInInvoiceSI = createAsyncThunk(
  "getListProdsInInvoiceSI",
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
);

////// delProdInInvoiceSI - удаление товаров с накладных
export const delProdInInvoiceSI = createAsyncThunk(
  "delProdInInvoiceSI",
  async function (props, { dispatch, rejectWithValue }) {
    const { data, action, invoice_guid } = props;
    const url = `${REACT_APP_API_URL}/ta/update_application_product`;
    try {
      const response = await axiosInstance.put(url, data);
      if (response.status >= 200 && response.status < 300) {
        myAlert(objStatusText?.[action]);
        ///// для get обновленных данных с добавленной заявкой
        dispatch(getListProdsInInvoiceSI(invoice_guid));
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// sendInvoiceForTT - отправка накладной торговому точке
export const sendInvoiceForTT = createAsyncThunk(
  "sendInvoiceForTT",
  async function ({ data }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/update_invoice`;
    try {
      const response = await axiosInstance.put(url, data);
      if (response.status >= 200 && response.status < 300) {
        myAlert("Накладная отправлена торговой точке");
        // dispatch(setInvoiceSendInfo({ seller_guid: "", invoice_guid: "" }));
        data?.navigate("/maps");
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getMyInvoice - get список накладных отпущенных админом
export const getMyInvoice = createAsyncThunk(
  "getMyInvoice",
  async function (guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_invoices?date=0&reciever_guid=${guid}&page=main`;
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

////// getMyEveryInvoice - get список товаров накладных отпущенных админом
export const getMyEveryInvoice = createAsyncThunk(
  "getMyEveryInvoice",
  async function (guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_invoice?invoice_guid=${guid}`;
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

////// acceptInvoice - принятие накладной ТА
export const acceptInvoice = createAsyncThunk(
  "acceptInvoice",
  async function ({ data, navigate }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/update_invoice`;
    try {
      const response = await axiosInstance.put(url, data);
      if (response.status >= 200 && response.status < 300) {
        if (response?.data?.result == 1) {
          myAlert("Накладная принята");
          dispatch(setInvoiceInfo({ guid: "", action: 0 }));
          dispatch(getMyInvoice(data?.user_guid));
        }
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// historyAcceptInvoice - история принятых накладных ТА в виде пдф
export const historyAcceptInvoice = createAsyncThunk(
  "historyAcceptInvoice",
  async function ({ agent_guid }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_invoices?date=0&reciever_guid=${agent_guid}&page=accepted`;
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

////// historySendInvoice - история отпущенных накладных ТА в виде пдф
export const historySendInvoice = createAsyncThunk(
  "historySendInvoice",
  async function (props, { dispatch, rejectWithValue }) {
    const { sender_guid, reciver_type, date } = props;
    const url = `${REACT_APP_API_URL}/ta/get_invoices?date=0&reciever_guid=${sender_guid}&page=otpusk_tt`;
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

/////// возврат

////// getInvoiceReturn - get накладные возврата
export const getInvoiceReturn = createAsyncThunk(
  "getInvoiceReturn",
  async function (props, { dispatch, rejectWithValue }) {
    const { reciever_guid, sender_guid, date_from, date_to } = props;
    const { reciever_type } = props;

    const url = `${REACT_APP_API_URL}/ta/get_return_invoice?route_guid=&reciever_guid=${reciever_guid}&sender_guid=${sender_guid}&date_from=${date_from}&date_to=${date_to}&is_admin=0&reciever_type=${reciever_type}`;
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

////// getProdsReturn - get товары возврата
export const getProdsReturn = createAsyncThunk(
  "getProdsReturn",
  async function (guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_invoice?invoice_guid=${guid}`;
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

////// createInvoiceReturn - создание накладных возврата
export const createInvoiceReturn = createAsyncThunk(
  "createInvoiceReturn",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/create_invoice`;
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

////// createProdsReturn - создание товаров возврата
export const createProdsReturn = createAsyncThunk(
  "createInvoiceReturn",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/create_invoice_product`;
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

////// changeStatusInvoiceReturn - изменение статуса накладной возврата
export const changeStatusInvoiceReturn = createAsyncThunk(
  "changeStatusInvoiceReturn",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/update_return_invoice`;
    try {
      const response = await axiosInstance.put(url, data);
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

////// delProdInInvoiceReturn - удаление товаров с заявок возврата
export const delProdInInvoiceReturn = createAsyncThunk(
  "delProdInInvoiceReturn",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/update_application_product`;
    try {
      const response = await axiosInstance.put(url, data);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoiceSlice",
  initialState,
  reducers: {
    setInvoiceSendInfo: (state, action) => {
      state.invoiceSendInfo = action?.payload;
    },

    //// меняется возможность редактирования данных
    setCheckInvoice: (state, action) => {
      state.checkInvoice = action.payload;
    },

    setListProdsSI: (state, action) => {
      state.listProdsSI = action.payload;
    },

    /////изменение ключа count и checkbox в списке товаров
    changeCountCheckedListProdsSI: (state, action) => {
      const { product_guid, count } = action.payload;
      state.listProdsSI = state.listProdsSI?.map((i) => {
        if (i?.product_guid === product_guid) {
          return { ...i, count, is_checked: count == "" ? false : true };
        } else {
          return i;
        }
      });
    },

    //// сброс cgeckbox и count в списке
    getDefaultListSI: (state, action) => {
      state.listProdsSI = state.listProdsSI?.map((i) => ({
        ...i,
        count: "",
        is_checked: false,
      }));
    },

    ///// очищаю временный список для отправки создания заказа от ТА
    clearListOrdersSI: (state, action) => {
      state.listSendOrdersSI = [];
    },

    /////изменение ключа count в списке товаров временной корзины
    changeCountOrdersSI: (state, action) => {
      const { product_guid, count } = action.payload;
      state.listSendOrdersSI = state.listSendOrdersSI?.map((i) =>
        i?.product_guid === product_guid ? { ...i, count, my_status: true } : i
      );
    },

    setViewApp: (state, action) => {
      state.viewApp = action.payload;
    },
  },

  extraReducers: (builder) => {
    ////////////// getListWorkShop
    builder.addCase(getListWorkShop.fulfilled, (state, action) => {
      state.preloader = false;
      state.listWorkshopSI = action.payload;
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
      state.listCategsSI = action.payload;
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
      state.listProdsSI = action.payload?.map((i) => ({
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
      state.listProdsSI = action.payload?.map((i) => ({ ...i, count: 1 }));
    });
    builder.addCase(searchListProds.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(searchListProds.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////// getListProdsInInvoiceSI
    builder.addCase(getListProdsInInvoiceSI.fulfilled, (state, action) => {
      state.preloader = false;
      state.listSendOrdersSI = action.payload?.map((i) => ({
        ...i,
        my_status: false,
      }));
    });
    builder.addCase(getListProdsInInvoiceSI.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListProdsInInvoiceSI.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////// getMyInvoice
    builder.addCase(getMyInvoice.fulfilled, (state, action) => {
      state.preloader = false;
      state.listInvoice = action.payload;
    });
    builder.addCase(getMyInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getMyInvoice.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////// getMyEveryInvoice
    builder.addCase(getMyEveryInvoice.fulfilled, (state, action) => {
      state.preloader = false;
      state.listProdEveryInvoice = action.payload;
    });
    builder.addCase(getMyEveryInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getMyEveryInvoice.pending, (state, action) => {
      state.preloader = true;
    });

    /////////// acceptInvoice
    builder.addCase(acceptInvoice.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(acceptInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(acceptInvoice.pending, (state, action) => {
      state.preloader = true;
    });

    /////////// historyAcceptInvoice
    builder.addCase(historyAcceptInvoice.fulfilled, (state, action) => {
      state.preloader = false;
      state.listHistoryAcceptInvoice = action.payload;
    });
    builder.addCase(historyAcceptInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(historyAcceptInvoice.pending, (state, action) => {
      state.preloader = true;
    });

    /////////// historySendInvoice
    builder.addCase(historySendInvoice.fulfilled, (state, action) => {
      state.preloader = false;
      state.listHistorySendInvoice = action.payload;
    });
    builder.addCase(historySendInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(historySendInvoice.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////// getInvoiceReturn
    builder.addCase(getInvoiceReturn.fulfilled, (state, action) => {
      state.preloader = false;
      state.listInvoiceReturn = action.payload;
    });
    builder.addCase(getInvoiceReturn.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getInvoiceReturn.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////// getProdsReturn
    builder.addCase(getProdsReturn.fulfilled, (state, action) => {
      state.preloader = false;
      state.listProdsReturn = action.payload;
    });
    builder.addCase(getProdsReturn.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getProdsReturn.pending, (state, action) => {
      state.preloader = true;
    });
  },
});

export const {
  setInvoiceSendInfo,
  setCheckInvoice,
  setListProdsSI,
  changeCountCheckedListProdsSI,
  getDefaultListSI,
  clearListOrdersSI,
  changeCountOrdersSI,
  setViewApp,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;

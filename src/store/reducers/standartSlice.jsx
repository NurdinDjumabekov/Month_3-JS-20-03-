import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../axiosInstance";
import { listMenuLocal } from "../../helpers/LocalData";

const { REACT_APP_API_URL } = process.env;

////// standartSlice

const initialState = {
  preloader: false,
  listWorkShopsNur: [], // список цехов
  listProdsNur: [], // список товаров
  listOrdersNur: [],
  listMenu: [...listMenuLocal],
  listRouteVisit: [], //// список историй посещения точек ТА
  activeSlide: 0,
  inviceData: { return: {}, send: {} }, // возврат,  // приход
  countsPoints: { today_tt: 0, total_tt: 0 },
  reportEveryTT: {}, /// отчет каждой точки
  reportPayEveryTT: {}, /// отчет оплаты каждой точки
  listTypesVisit: [], /// Результат не установлен,Успешное посещение"
  listAllPointsTA: [], /// список всех точек ТА
  listInvoice: [], /// список накладных отпущенных админом и возврат, которй оформил ТА
};

////// getInvoiceWorkShop - get список накладных отпущенных админом
export const getInvoiceWorkShop = createAsyncThunk(
  "getInvoiceWorkShop",
  async function (guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_invoices?date=0&reciever_guid=${guid}&page=all_workshop`;
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

////// acceptInvoice - принятие накладной отпущенной цехом
export const acceptInvoice = createAsyncThunk(
  "acceptInvoice",
  async function ({ data }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/update_invoice`;
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

////// getInvoiceReturn - get накладные возврата оформленные от ТА
export const getInvoiceReturn = createAsyncThunk(
  "getInvoiceReturn",
  async function (props, { dispatch, rejectWithValue }) {
    const { sender_guid } = props;
    const url = `${REACT_APP_API_URL}/ta/get_return_invoice?sender_guid=${sender_guid}&is_admin=1&page=main`;
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

////// getListWorkShopsNur - get список цехов
export const getListWorkShopsNur = createAsyncThunk(
  "getListWorkShopsNur",
  async function ({ link }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/${link}`;
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

////// searchListProdsNur - поиск товара в списке
export const searchListProdsNur = createAsyncThunk(
  "searchListProdsNur",
  async function ({ link }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/${link}`;
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

////// getListProdsNur - get список товаров с категориями
export const getListProdsNur = createAsyncThunk(
  "getListProdsNur",
  async function ({ links, guid }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/${links}`;
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

////// addProdsInInvoiceNur - добаввление товара в накладную
export const addProdsInInvoiceNur = createAsyncThunk(
  "addProdsInInvoiceNur",
  async function ({ data }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/create_application_product`;
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

////// getListProdsInInvoiceNur - список товаров определённого заказа
export const getListProdsInInvoiceNur = createAsyncThunk(
  "getListProdsInInvoiceNur",
  async function (invoice_guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_application?invoice_guid=${invoice_guid}`;
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

////// delProdsInInvoiceNur - удаление товаров определённого заказа
export const delProdsInInvoiceNur = createAsyncThunk(
  "delProdsInInvoiceNur",
  async function ({ data }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/update_application_product`;
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

////// editProdsInInvoiceNur - удаление товаров определённого заказа
export const editProdsInInvoiceNur = createAsyncThunk(
  "editProdsInInvoiceNur",
  async function ({ data }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/update_application_product`;
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

////// createInvoice - создание накладных (всех)
export const createInvoice = createAsyncThunk(
  "createInvoice",
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

////// getDataInvoiceReturn - get данные накладных возврата
export const getDataInvoiceReturn = createAsyncThunk(
  "getDataInvoiceReturn",
  async function (invoice_guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_application?invoice_guid=${invoice_guid}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.[0] || {};
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getDataInvoiceSend - get данные накладных отпуска
export const getDataInvoiceSend = createAsyncThunk(
  "getDataInvoiceSend",
  async function (invoice_guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_application?invoice_guid=${invoice_guid}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.[0] || {};
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getCountsPoint - get кол-ва точек у агента(на сегодня и в общем)
export const getCountsPoint = createAsyncThunk(
  "getCountsPoint",
  async function (agent_guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_point_count?agent_guid=${agent_guid}`;
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

////// getReportEveryTT - get данные отчеты каждогой ТТ
export const getReportEveryTT = createAsyncThunk(
  "getReportEveryTT",
  async function (point_guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_point_report?point_guid=${point_guid}&date`;
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

////// getReportPayEveryTT - get данные отчета оплаты каждой ТТ
export const getReportPayEveryTT = createAsyncThunk(
  "getReportPayEveryTT",
  async function (props, { dispatch, rejectWithValue }) {
    const { date, point_guid } = props;
    const url = `${REACT_APP_API_URL}/ta/get_point_oplata_report?point_guid=${point_guid}&date=${date}`;
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

////// sendPayAgent - оплата для всех от ТА(касса и ТТ)
export const sendPayAgent = createAsyncThunk(
  "sendPayAgent",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/add_oplata`;
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

////// getListVisitPoints - get список посещений точек
export const getListVisitPoints = createAsyncThunk(
  "getListVisitPoints",
  async function (point_guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/agent_routes?point_guid=${point_guid}`;
    // const url = `${REACT_APP_API_URL}/ta/agent_routes`;
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

////// actionMyVisitPoints - действия посещения ТА в точке (пришел и ушел)
export const actionMyVisitPoints = createAsyncThunk(
  "actionMyVisitPoints",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/set_route`;
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

////// getListTypeVisit - get список типов посещений точек (успешно, закрыто и т.д.)
export const getListTypeVisit = createAsyncThunk(
  "getListTypeVisit",
  async function (agent_guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_comment_type`;
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

////// getListTT - get список всех точек у ТА /// check
export const getListTT = createAsyncThunk(
  "getListTT",
  async function (agent_guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_points?agent_guid=${agent_guid}`;
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

const standartSlice = createSlice({
  name: "standartSlice",
  initialState,
  reducers: {
    listMenuFN: (state, action) => {
      state.listMenu = action?.payload;
    },
    activeSlideFN: (state, action) => {
      state.activeSlide = action?.payload;
    },
    clearListOrdersNurFN: (state, action) => {
      state.listOrdersNur = [];
    },
  },
  extraReducers: (builder) => {
    ///////////// getInvoiceWorkShop
    builder.addCase(getInvoiceWorkShop.fulfilled, (state, action) => {
      state.preloader = false;
      state.listInvoice = action.payload;
    });
    builder.addCase(getInvoiceWorkShop.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getInvoiceWorkShop.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////// getInvoiceReturn
    builder.addCase(getInvoiceReturn.fulfilled, (state, action) => {
      state.preloader = false;
      state.listInvoice = action.payload;
    });
    builder.addCase(getInvoiceReturn.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getInvoiceReturn.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////// getListWorkShopsNur
    builder.addCase(getListWorkShopsNur.fulfilled, (state, action) => {
      state.preloader = false;
      state.listWorkShopsNur = action.payload;
    });
    builder.addCase(getListWorkShopsNur.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListWorkShopsNur.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////// searchListProdsNur
    builder.addCase(searchListProdsNur.fulfilled, (state, action) => {
      // state.preloader = false;
      state.listProdsNur = action.payload;
    });
    builder.addCase(searchListProdsNur.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
    });
    builder.addCase(searchListProdsNur.pending, (state, action) => {
      // state.preloader = true;
    });

    ///////////// getListProdsNur
    builder.addCase(getListProdsNur.fulfilled, (state, action) => {
      // state.preloader = false;
      state.listProdsNur = action.payload;
    });
    builder.addCase(getListProdsNur.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
    });
    builder.addCase(getListProdsNur.pending, (state, action) => {
      // state.preloader = true;
    });

    ///////////// getMyEveryInvoice
    builder.addCase(getMyEveryInvoice.fulfilled, (state, action) => {
      state.preloader = false;
      state.listProdsNur = action.payload;
    });
    builder.addCase(getMyEveryInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getMyEveryInvoice.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////// getListProdsInInvoiceNur
    builder.addCase(getListProdsInInvoiceNur.fulfilled, (state, action) => {
      state.preloader = false;
      state.listOrdersNur = action.payload;
    });
    builder.addCase(getListProdsInInvoiceNur.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      state.listSendOrders = [];
    });
    builder.addCase(getListProdsInInvoiceNur.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////// getDataInvoiceReturn
    builder.addCase(getDataInvoiceReturn.fulfilled, (state, action) => {
      // state.preloader = false;
      state.inviceData = { ...state.inviceData, return: action.payload };
    });
    builder.addCase(getDataInvoiceReturn.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
      state.listSendOrders = [];
    });
    builder.addCase(getDataInvoiceReturn.pending, (state, action) => {
      // state.preloader = true;
    });

    ///////////////// getDataInvoiceSend
    builder.addCase(getDataInvoiceSend.fulfilled, (state, action) => {
      // state.preloader = false;
      state.inviceData = { ...state.inviceData, send: action.payload };
    });
    builder.addCase(getDataInvoiceSend.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
      state.listSendOrders = [];
    });
    builder.addCase(getDataInvoiceSend.pending, (state, action) => {
      // state.preloader = true;
    });

    ///////////////// getCountsPoint
    builder.addCase(getCountsPoint.fulfilled, (state, action) => {
      state.preloader = false;
      state.countsPoints = action.payload;
    });
    builder.addCase(getCountsPoint.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getCountsPoint.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////// getReportEveryTT
    builder.addCase(getReportEveryTT.fulfilled, (state, action) => {
      state.preloader = false;
      state.reportEveryTT = action.payload;
    });
    builder.addCase(getReportEveryTT.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getReportEveryTT.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////////// getReportPayEveryTT
    builder.addCase(getReportPayEveryTT.fulfilled, (state, action) => {
      state.preloader = false;
      state.reportPayEveryTT = action.payload;
    });
    builder.addCase(getReportPayEveryTT.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getReportPayEveryTT.pending, (state, action) => {
      state.preloader = true;
    });

    /////////////////// getListVisitPoints
    builder.addCase(getListVisitPoints.fulfilled, (state, action) => {
      state.preloader = false;
      state.listRouteVisit = action.payload;
    });
    builder.addCase(getListVisitPoints.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListVisitPoints.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////////// getListTypeVisit
    builder.addCase(getListTypeVisit.fulfilled, (state, action) => {
      state.preloader = false;
      state.listTypesVisit = action.payload;
    });
    builder.addCase(getListTypeVisit.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListTypeVisit.pending, (state, action) => {
      state.preloader = true;
    });

    /////////////////////// getListTT
    builder.addCase(getListTT.fulfilled, (state, action) => {
      state.preloader = false;
      state.listAllPointsTA = action.payload;
    });
    builder.addCase(getListTT.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListTT.pending, (state, action) => {
      state.preloader = true;
    });
  },
});

export const { listMenuFN, activeSlideFN, clearListOrdersNurFN } =
  standartSlice.actions;

export default standartSlice.reducer;

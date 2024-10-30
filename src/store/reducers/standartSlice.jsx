import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../axiosInstance";
import { listProdsCateg } from "../../helpers/LocalData";

const { REACT_APP_API_URL } = process.env;

const initialState = {
  listWorkShopsNur: [], // список цехов
  listProdsNur: [], // список цехов
  listOrdersNur: [],
};

////// getListWorkShopsNur - get список цехов
export const getListWorkShopsNur = createAsyncThunk(
  "getListWorkShopsNur",
  async function ({ link }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_workshop`;
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
    async function (invoice_guid, { dispatch, rejectWithValue }) {
      const url = `${REACT_APP_API_URL}/ta/update_application_product`;
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
    asdas: (state, action) => {
      state.stateLoad = action?.payload;
    },
  },
  extraReducers: (builder) => {
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

    ///////////// getListProdsNur
    builder.addCase(getListProdsNur.fulfilled, (state, action) => {
      state.preloader = false;
      //   state.listProdsNur = action.payload;
      state.listProdsNur = listProdsCateg;
    });
    builder.addCase(getListProdsNur.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListProdsNur.pending, (state, action) => {
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
  },
});

export const { asdas } = standartSlice.actions;

export default standartSlice.reducer;

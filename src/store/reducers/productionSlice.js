import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { myAlert } from "../../helpers/MyAlert";
import axiosInstance from "../../axiosInstance";
import { getListOrders } from "./mainSlice";
import { searchActiveOrdersTA } from "../../helpers/searchActiveOrdersTA";
import { transformActionDate } from "../../helpers/transformDate";

const { REACT_APP_API_URL } = process.env;

const initialState = {
  listProduction: [], /// список товаров в производстве
  listHistoryProduction: [], /// список историй товаров в производстве
  listProductionInvoice: [], /// список накладных в производстве
  activeDate: transformActionDate(new Date()),
};

////// getListProdProduction - get список товаров производства
export const getListProdProduction = createAsyncThunk(
  "getListProdProduction",
  async function (props, { dispatch, rejectWithValue }) {
    const { date_from, date_to, setActiveInvoice } = props;
    const url = `${REACT_APP_API_URL}/ta/get_production_invoice?date_from=${
      date_from || ""
    }&date_to=${date_to || ""}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        setActiveInvoice(response?.data?.[0]);
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// sendInWareHomeFN - отправка товаров на склад
export const sendInWareHomeFN = createAsyncThunk(
  "sendInWareHomeFN",
  async function (props, { dispatch, rejectWithValue }) {
    const { data, listTA, activeDate, setActiveInvoice } = props;
    const url = `${REACT_APP_API_URL}/ta/update_production_invoice`;
    try {
      const response = await axiosInstance.put(url, data);
      if (response.status >= 200 && response.status < 300) {
        myAlert("Список товаров отправлен на склад");
        const obj = { date_from: "", date_to: "", setActiveInvoice };
        dispatch(getListProdProduction(obj));
        //// для обновление списка товаров произ-ва

        const agents_guid = searchActiveOrdersTA(listTA);
        dispatch(getListOrders({ ...activeDate, agents_guid }));
        /// обновление данных календаря

        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productionSlice = createSlice({
  name: "productionSlice",
  initialState,
  reducers: {
    setListProduction: (state, action) => {
      state.listProduction = action.payload;
    },

    setListProductionInvoice: (state, action) => {
      state.listProductionInvoice = action.payload;
    },

    /////изменение ключа count в списке товаров производства
    changeCountProduction: (state, action) => {
      const { product_guid, count } = action.payload;
      state.listProduction = state.listProduction?.map((i) =>
        i?.product_guid === product_guid ? { ...i, count } : i
      );
    },

    setActiveDate: (state, action) => {
      state.activeDate = action.payload;
    },
  },

  extraReducers: (builder) => {
    ////////////// getListProdProduction
    builder.addCase(getListProdProduction.fulfilled, (state, action) => {
      state.preloader = false;
      state.listProduction = action.payload?.[0]?.products?.map((i) => ({
        ...i,
        countOld: i.count,
      }));
      state.listProductionInvoice = action.payload;
    });
    builder.addCase(getListProdProduction.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListProdProduction.pending, (state, action) => {
      state.preloader = true;
    });
  },
});
export const {
  setListProductionInvoice,
  setListProduction,
  changeCountProduction,
  setActiveDate,
} = productionSlice.actions;

export default productionSlice.reducer;

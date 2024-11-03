import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../axiosInstance";
import { transformActionDate } from "../../helpers/transformDate";

const { REACT_APP_API_URL } = process.env;

const initialState = {
  stateLoad: true, /// всегда меняю его с true на false и наоборот (нужен для перезагрузки карт)
  listExpense: [], // список типов трат
  listExpenseTA: [], /// список трат ТА
};

////// TestTest - get список цехов
export const TestTest = createAsyncThunk(
  "TestTest",
  async function (props, { dispatch, rejectWithValue }) {
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

////// getListExpense - get список трат
export const getListExpense = createAsyncThunk(
  "getListExpense",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_expense_type`;
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

////// getListExpenseTA - get sp список трат
export const getListExpenseTA = createAsyncThunk(
  "getListExpenseTA",
  async function (guid, { dispatch, rejectWithValue }) {
    const date = transformActionDate(new Date());
    const url = `${REACT_APP_API_URL}/ta/get_expenses?user_guid=${guid}&date_to=${date}&date_from=2024-10-01`;
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

////// createExpenseTA - create тратy
export const createExpenseTA = createAsyncThunk(
  "createExpenseTA",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/add_expense`;
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

////// delExpenseTA - create тратy
export const delExpenseTA = createAsyncThunk(
  "delExpenseTA",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/del_expense`;
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

const stateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    asdas: (state, action) => {
      state.stateLoad = action?.payload;
    },
  },
  extraReducers: (builder) => {
    ////////////// getListExpense
    builder.addCase(getListExpense.fulfilled, (state, action) => {
      state.preloader = false;
      state.listExpense = action.payload;
    });
    builder.addCase(getListExpense.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListExpense.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////// getListExpenseTA
    builder.addCase(getListExpenseTA.fulfilled, (state, action) => {
      state.preloader = false;
      state.listExpenseTA = action.payload;
    });
    builder.addCase(getListExpenseTA.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListExpenseTA.pending, (state, action) => {
      state.preloader = true;
    });
  },
});

export const { asdas } = stateSlice.actions;

export default stateSlice.reducer;

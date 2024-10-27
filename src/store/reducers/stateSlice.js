import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

const { REACT_APP_API_URL } = process.env;

const initialState = {
  stateLoad: true, /// всегда меняю его с true на false и наоборот (нужен для перезагрузки карт)
  listExpense: [],
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
    const url = `${REACT_APP_API_URL}/ta/get_expenses?user_guid=${guid}&date_to=2024-10-23&date_from=2024-10-23`;
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
  },
});

export const { asdas } = stateSlice.actions;

export default stateSlice.reducer;

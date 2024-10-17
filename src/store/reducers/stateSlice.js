import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

const { REACT_APP_API_URL } = process.env;

const initialState = {
  stateLoad: true, /// всегда меняю его с true на false и наоборот (нужен для перезагрузки карт)
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

const stateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    asdas: (state, action) => {
      state.stateLoad = action?.payload;
    },
  },
});

export const { asdas } = stateSlice.actions;

export default stateSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { myAlert } from "../../helpers/MyAlert";
import axiosInstance from "../../axiosInstance";

const { REACT_APP_API_URL } = process.env;

const initialState = {
  debtEveryTA: { vozvrat: [], dolg: [] }, /// долг каждого агента
  dataPay: { comment: "", amount: "", user_guid_to: "", user_type_to: "" },
  listPaysTA: [], /// список оплат ТА
  balanceTA: [], /// баласн агента (долги ТТ, долг ТА в цех и нынешнрий балас)
};

////// getEveryDebt - get список долгов каждого ТА
export const getEveryDebt = createAsyncThunk(
  "getEveryDebt",
  async function ({ agent_guid }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/account?agent_guid=${agent_guid}`;
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

////// sendPayFN - оплата (для всех)
export const sendPayFN = createAsyncThunk(
  "sendPayFN",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/add_oplata`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        if (response?.data?.result == 1) {
          dispatch(clearDataPay());
          myAlert("Оплата успешно произведена");
          dispatch(getEveryDebt({ agent_guid: data?.user_guid }));
        }
        return response?.data?.result;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getListPayTA - get список оплат ТА
export const getListPayTA = createAsyncThunk(
  "getListPayTA",
  async function ({ agent_guid }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/ta_transaction?agent_guid=${agent_guid}`;
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

////// getBalance - get баланс (все счета агента)
export const getBalance = createAsyncThunk(
  "getBalance",
  async function (agent_guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/agent_balance?agent_guid=${agent_guid}`;
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

const paySlice = createSlice({
  name: "paySlice",
  initialState,
  reducers: {
    setDebtEveryTA: (state, action) => {
      state.debtEveryTA = action?.payload;
    },

    setDataPay: (state, action) => {
      state.dataPay = action?.payload;
    },

    clearDataPay: (state, action) => {
      state.dataPay = {
        comment: "",
        amount: "",
        user_guid_to: "",
        user_type_to: "",
      };
    },
  },
  extraReducers: (builder) => {
    ////////////// getEveryDebt
    builder.addCase(getEveryDebt.fulfilled, (state, action) => {
      state.preloader = false;
      state.debtEveryTA = action.payload;
    });
    builder.addCase(getEveryDebt.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getEveryDebt.pending, (state, action) => {
      state.preloader = true;
    });

    //////////////// getListPayTA
    builder.addCase(getListPayTA.fulfilled, (state, action) => {
      state.preloader = false;
      state.listPaysTA = action.payload;
    });
    builder.addCase(getListPayTA.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListPayTA.pending, (state, action) => {
      state.preloader = true;
    });

    /////////////////////// getBalance
    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.preloader = false;
      state.balanceTA = action.payload;
    });
    builder.addCase(getBalance.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getBalance.pending, (state, action) => {
      state.preloader = true;
    });
  },
});

export const { setDebtEveryTA, setDataPay, clearDataPay } = paySlice.actions;

export default paySlice.reducer;

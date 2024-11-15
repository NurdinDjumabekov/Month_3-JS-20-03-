import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

//// slice
import spendingSlice from "./reducers/spendingSlice";
import saveDataSlice from "./reducers/saveDataSlice";
import orderSlice from "./reducers/orderSlice";
import selectsSlice from "./reducers/selectsSlice";
import mapSlice from "./reducers/mapSlice";
import photoSlice from "./reducers/photoSlice";
import leftoversSlice from "./reducers/leftoversSlice";
import paySlice from "./reducers/paySlice";
import pointsSlice from "./reducers/pointsSlice";
import standartSlice from "./reducers/standartSlice";

const reducer = combineReducers({
  orderSlice,
  spendingSlice,
  saveDataSlice,
  selectsSlice,
  mapSlice,
  photoSlice,
  leftoversSlice,
  paySlice,
  pointsSlice,
  standartSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["saveDataSlice"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export { store };

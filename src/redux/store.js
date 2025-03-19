import { configureStore } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk";
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
import { shopReducer } from "./shop/slice";
import { filterReducer } from "./filters/slice";
import { modalReducer } from "./modal/slice";
import authReducer from "./auth/slice";
import { productsReducer } from "./products/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    shops: shopReducer,
    filters: filterReducer,
    auth: persistedAuthReducer,
    modal: modalReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }).concat(thunk),
// });

export const persistor = persistStore(store);

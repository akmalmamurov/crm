import { configureStore } from "@reduxjs/toolkit";
import CrmReducer from "./Reducer";
import authReducer from "./slices/authSlices";
import themeReducer from "./slices/themeSlices";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import languageReducer from "./slices/languageSlices";
const persistConfig = {
  key: "newcrm",
  storage,
};
const persistedThemeReducer = persistReducer(persistConfig, themeReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedLanguageReducer = persistReducer(persistConfig, languageReducer);
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    theme: persistedThemeReducer,
    language: persistedLanguageReducer,
    CrmReducer,
    devTools: import.meta.env.NODE_ENV !== "production",
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

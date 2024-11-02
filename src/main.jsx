import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "./adapters/Api/apolloClientUrl.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "@/Redux/Store.jsx";
import "./App.css";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

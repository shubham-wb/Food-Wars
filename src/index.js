import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import App from "./components/App";

import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
});
console.log(store.getState());
//creating a store for state management
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

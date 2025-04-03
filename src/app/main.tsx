import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "../pages/HomePage/HomePage.tsx";
import { Provider } from "react-redux";
import { store } from "./Store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HomePage />
    </Provider>
  </StrictMode>
);

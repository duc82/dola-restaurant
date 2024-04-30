import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { Toaster } from "react-hot-toast";
import RouteChange from "./components/RouteChange";
import { HelmetProvider } from "react-helmet-async";
import { AddedCartProvider } from "./context/AddedCartContext";
import { PersistGate } from "redux-persist/integration/react";
import ProductQuickviewProvider from "./providers/ProductQuickviewProvider";
import "@/styles/index.css";
import "swiper/css";
import "swiper/css/pagination";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-quill/dist/quill.snow.css";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ProductQuickviewProvider>
            <AddedCartProvider>
              <Toaster containerClassName="!z-[999999]" />
              <HelmetProvider>
                <App />
              </HelmetProvider>
              <RouteChange />
            </AddedCartProvider>
          </ProductQuickviewProvider>
        </PersistGate>
      </Provider>
    </Router>
  </React.StrictMode>
);

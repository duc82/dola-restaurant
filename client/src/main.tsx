import ReactDOM from "react-dom/client";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./providers/CartProvider";
import { PersistGate } from "redux-persist/integration/react";
import ProductQuickviewProvider from "./providers/ProductQuickviewProvider";
import "swiper/css";
import "swiper/css/pagination";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-loading-skeleton/dist/skeleton.css";
import "@/assets/styles/index.css";
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ProductQuickviewProvider>
          <CartProvider>
            <Toaster containerClassName="!z-[999999]" />
            <HelmetProvider>
              <RouterProvider router={router}></RouterProvider>
            </HelmetProvider>
          </CartProvider>
        </ProductQuickviewProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/styles/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { Toaster } from "react-hot-toast";
import RouteChange from "./components/RouteChange";
import { ProductQuickviewProvider } from "./context/ProductQuickviewContent";
import { HelmetProvider } from "react-helmet-async";
import { AddedCartProvider } from "./context/AddedCartContext";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
  </StrictMode>
);

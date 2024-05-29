import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import PrivateLayout from "./layouts/PrivateLayout";
import AccountLayout from "./layouts/AccountLayout";
import Logout from "./pages/Logout";
import Order from "./pages/Account/Order";
import Orders from "./pages/Account/Orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <Home />
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "dang-nhap",
            element: <Login />
          },
          {
            path: "dang-ky",
            element: <SignUp />
          },
          {
            path: "doi-mat-khau/:email/:token",
            element: <ResetPassword />
          }
        ]
      },
      {
        element: <PrivateLayout redirect="/dang-nhap" />,
        children: [
          {
            element: <AccountLayout />,
            children: [
              {
                element: <Orders />
              },
              {
                element: <
              }
            ]
          },
          {
            element: <Logout />
          }
        ]
      }
    ]
  }
]);

export default router;

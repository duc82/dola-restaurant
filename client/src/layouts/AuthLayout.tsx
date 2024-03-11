import cookies from "@/utils/cookies";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FacebookProvider } from "react-facebook";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isLoggedIn = Boolean(cookies.get("isLoggedIn"));

  return isLoggedIn ? (
    <Navigate to="/" replace={true} />
  ) : (
    <FacebookProvider appId={import.meta.env.VITE_FACEBOOK_APP_ID}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Outlet />
      </GoogleOAuthProvider>
    </FacebookProvider>
  );
};

export default AuthLayout;

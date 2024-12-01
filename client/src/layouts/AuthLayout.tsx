import { useAppSelector } from "@/store/hooks";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FacebookProvider } from "react-facebook";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const { accessToken } = useAppSelector((state) => state.auth);

  if (accessToken) {
    return <Navigate to="/tai-khoan" />;
  }

  return (
    <FacebookProvider appId={import.meta.env.VITE_FACEBOOK_APP_ID}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Outlet />
      </GoogleOAuthProvider>
    </FacebookProvider>
  );
};

export default AuthLayout;

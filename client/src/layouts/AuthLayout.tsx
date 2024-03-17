import { useAppSelector } from "@/store/hooks";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { FacebookProvider } from "react-facebook";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate(-1);
    }
  }, [accessToken, navigate]);

  return (
    <FacebookProvider appId={import.meta.env.VITE_FACEBOOK_APP_ID}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Outlet />
      </GoogleOAuthProvider>
    </FacebookProvider>
  );
};

export default AuthLayout;

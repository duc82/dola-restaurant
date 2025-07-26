import { useAppSelector } from "@/store/hooks";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FacebookProvider } from "react-facebook";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { user } = useAppSelector((state) => state.user);

  if (user) {
    return <Navigate to="/" replace />;
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

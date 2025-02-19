import { useLogin } from "react-facebook";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "react-hot-toast";
import authService from "@/services/authService";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/reducers/authSlice";
import { setUser } from "@/store/reducers/userSlice";
import fb_btn from "@/assets/images/fb-btn.svg";

const FacebookLogin = () => {
  const dispatch = useAppDispatch();
  const { login, isLoading } = useLogin();

  const handleLoginFacebook = async () => {
    try {
      const authRes = await login({
        scope: "email",
      });
      const authResponse = authRes.authResponse;
      const data = await authService.loginFacebook(authResponse.accessToken);
      dispatch(loginSuccess(data.accessToken));
      dispatch(setUser(data.user));
    } catch (_error) {
      toast.error("Đăng nhập thất bại");
    }
  };

  return (
    <button type="button" onClick={handleLoginFacebook} disabled={isLoading}>
      <LazyLoadImage
        width={129}
        height={37}
        effect="opacity"
        src={fb_btn}
        alt="Facebook"
      />
    </button>
  );
};

export default FacebookLogin;

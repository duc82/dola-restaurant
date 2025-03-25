import { LazyLoadImage } from "react-lazy-load-image-component";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import handlingAxiosError from "@/utils/handlingAxiosError";
import authService from "@/services/authService";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/reducers/authSlice";
import { setUser } from "@/store/reducers/userSlice";
import gp_btn from "@/assets/images/gp-btn.svg";

const GoogleLogin = () => {
  const dispatch = useAppDispatch();
  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const data = await authService.loginGoogle(code);
        dispatch(loginSuccess(data.accessToken));
        dispatch(setUser(data.user));
      } catch (error) {
        toast.error(handlingAxiosError(error).message);
      }
    },
    onError: (error) =>
      toast.error(
        error instanceof Error ? error.message : "Đăng nhập google thất bại"
      ),
    flow: "auth-code",
  });

  return (
    <button type="button" onClick={handleLoginGoogle}>
      <LazyLoadImage
        width={129}
        height={37}
        effect="opacity"
        src={gp_btn}
        alt="Google"
      />
    </button>
  );
};

export default GoogleLogin;

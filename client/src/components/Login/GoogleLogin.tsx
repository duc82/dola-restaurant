import { LazyLoadImage } from "react-lazy-load-image-component";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import handlingAxiosError from "@/utils/handlingAxiosError";
import authService from "@/services/authService";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/reducers/authSlice";
import { setUser } from "@/store/reducers/userSlice";

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
        src="/gp-btn.svg"
        alt="Google"
      />
    </button>
  );
};

export default GoogleLogin;

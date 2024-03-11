import { LazyLoadImage } from "react-lazy-load-image-component";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import handlingAxiosError from "@/utils/handlingAxiosError";
import authService from "@/services/authService";

const GoogleLogin = () => {
  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        await authService.loginGoogle(code);
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
        src={"/gp-btn.svg"}
        alt="Google"
      />
    </button>
  );
};

export default GoogleLogin;

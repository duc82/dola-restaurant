import { useLogin } from "react-facebook";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import authService from "@/services/authService";

const FacebookLogin = () => {
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();

  const handleLoginFacebook = async () => {
    try {
      const authRes = await login({
        scope: "email",
      });
      const authResponse = authRes.authResponse;
      await authService.loginFacebook(authResponse.accessToken);
      navigate("/tai-khoan");
    } catch (error) {
      toast.error("Đăng nhập thất bại");
    }
  };

  return (
    <button type="button" onClick={handleLoginFacebook} disabled={isLoading}>
      <LazyLoadImage
        width={129}
        height={37}
        effect="opacity"
        src={"/fb-btn.svg"}
        alt="Facebook"
      />
    </button>
  );
};

export default FacebookLogin;

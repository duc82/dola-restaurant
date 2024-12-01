import { ChangeEvent, FormEvent, useState } from "react";
import InputGroup from "./InputGroup";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { toast } from "react-hot-toast";
import authService from "@/services/authService";
import Button from "./Button";
import { Spinner } from "@/icons";
import cn from "@/utils/cn";

const ForgotPassword = ({ isOpen }: { isOpen: boolean }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await authService.forgotPassword(email);
      toast.success(data.message);
    } catch (error) {
      const err = handlingAxiosError(error);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
      setEmail("");
    }
  };

  return (
    <div
      className={cn(
        "transition-all duration-500 grid grid-rows-[0fr] invisible",
        isOpen && "grid-rows-[1fr] visible"
      )}
    >
      <form onSubmit={onSubmit} className="overflow-hidden">
        <InputGroup
          type="text"
          id="emailForgot"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
        />
        <Button
          type="submit"
          inactive={isLoading ? "cursorNotAllowed" : "primaryHover"}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Spinner className="w-5 h-5 animate-spin" />
              <span>Đang tải</span>
            </div>
          ) : (
            "Lấy lại mật khẩu"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;

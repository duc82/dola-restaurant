import { ChangeEvent, FormEvent, useState } from "react";
import InputGroup from "./InputGroup";
import { motion } from "framer-motion";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { toast } from "react-hot-toast";
import authService from "@/services/authService";
import Button from "./Button";
import { Spinner } from "@/icons";

const variants = {
  open: {
    height: "auto",
    display: "block",
    overflow: "hidden",
  },
  closed: {
    height: 0,
    transitionEnd: {
      display: "none",
    },
    overflow: "hidden",
  },
};

const ForgotPassword = ({ active }: { active: boolean }) => {
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
    <motion.div
      className="mb-4 mt-2"
      initial="closed"
      animate={active ? "open" : "closed"}
      variants={variants}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={onSubmit}>
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
    </motion.div>
  );
};

export default ForgotPassword;

import { string } from "yup";
import { signUpSchema } from "./authSchema";

const createUserSchema = signUpSchema.clone().shape({
  role: string().oneOf(["user", "admin"]).required("Vai trò là bắt buộc."),
});

export { createUserSchema };

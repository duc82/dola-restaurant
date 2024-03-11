import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { resetAuth } from "@/store/reducers/authSlice";
import authService from "@/services/authService";

const Logout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    authService.logout().then(() => {
      dispatch(resetAuth());
      window.location.href = "/dang-nhap";
    });
  }, [dispatch]);

  return null;
};

export default Logout;

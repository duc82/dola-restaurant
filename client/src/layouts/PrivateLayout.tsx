import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import userService from "@/services/userService";
import { setUser } from "@/store/reducers/userSlice";

const PrivateLayout = ({ redirect }: { redirect: string }) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user = await userService.getCurrent();
        dispatch(setUser(user));
      } catch (error) {
        window.location.href = "/dang-nhap";
      }
    };

    if (!user) {
      getCurrentUser();
    }
  }, [user, dispatch]);

  return isLoggedIn ? <Outlet /> : <Navigate to={redirect} />;
};

export default PrivateLayout;

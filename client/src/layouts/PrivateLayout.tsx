import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCurrentUser } from "@/store/reducers/userSlice";
import { resetAuth } from "@/store/reducers/authSlice";
import authService from "@/services/authService";

const PrivateLayout = ({ redirect }: { redirect: string }) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser())
        .unwrap()
        .catch(() => {
          authService.logout().then(() => {
            dispatch(resetAuth());
            window.location.href = redirect;
          });
        });
    }
  }, [user, dispatch, redirect]);

  return isLoggedIn ? <Outlet /> : <Navigate to={redirect} />;
};

export default PrivateLayout;

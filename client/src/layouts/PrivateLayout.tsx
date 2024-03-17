import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCurrentUser } from "@/store/reducers/userSlice";
import { resetAuth } from "@/store/reducers/authSlice";

const PrivateLayout = ({ redirect }: { redirect: string }) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser())
        .unwrap()
        .catch(() => {
          dispatch(resetAuth());
          window.location.replace(redirect);
        });
    }
  }, [user, dispatch, redirect]);

  return accessToken ? <Outlet /> : <Navigate to={redirect} />;
};

export default PrivateLayout;

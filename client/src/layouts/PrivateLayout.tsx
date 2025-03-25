import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCurrentUser } from "@/store/reducers/userSlice";

const PrivateLayout = ({ redirect }: { redirect: string }) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser())
        .unwrap()
        .catch(() => {
          window.location.href = redirect;
        });
    }
  }, [user, dispatch, redirect]);

  return <Outlet />;
};

export default PrivateLayout;

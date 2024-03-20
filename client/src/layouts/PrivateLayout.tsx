import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCurrentUser } from "@/store/reducers/userSlice";
import { resetAuth } from "@/store/reducers/authSlice";
import { setAddress } from "@/store/reducers/addressSlice";

const PrivateLayout = ({ redirect }: { redirect: string }) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser())
        .unwrap()
        .then((data) => {
          dispatch(setAddress(data.addresses));
        })
        .catch(() => {
          dispatch(resetAuth());
          window.location.replace(redirect);
        });
    }
  }, [user, dispatch, redirect]);

  return <Outlet />;
};

export default PrivateLayout;

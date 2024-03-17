import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Admin/Header";
import Sidebar from "../components/Admin/Sidebar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCurrentUser } from "@/store/reducers/userSlice";
import { resetAuth } from "@/store/reducers/authSlice";

const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const [isActiveSidebar, setActiveSidebar] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser())
        .unwrap()
        .catch(() => {
          dispatch(resetAuth());
          navigate("/dang-nhap");
        });
    } else {
      if (user.role !== "admin") {
        navigate("/");
      }
    }
  }, [user, dispatch, navigate]);

  return (
    <>
      <Header toggleSidebar={() => setActiveSidebar(!isActiveSidebar)} />
      <Sidebar />
      <div className="pt-[66px] md:pt-20 lg:pt-[88px] flex h-full overflow-y-auto lg:ml-64">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;

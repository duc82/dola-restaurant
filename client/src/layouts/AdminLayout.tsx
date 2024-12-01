import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Admin/Header";
import Sidebar from "../components/Admin/Sidebar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCurrentUser } from "@/store/reducers/userSlice";
import { resetAuth } from "@/store/reducers/authSlice";
import LimitProvider from "@/providers/LimitProvider";

const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
        navigate(-1);
      }
    }
  }, [user, dispatch, navigate]);

  return (
    <>
      <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} />
      <div className="pt-[66px] md:pt-20 lg:pt-[88px] flex h-full overflow-y-auto lg:ml-72">
        <LimitProvider>
          <Outlet />
        </LimitProvider>
      </div>
    </>
  );
};

export default AdminLayout;

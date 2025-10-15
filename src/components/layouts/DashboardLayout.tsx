import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen py-4 px-6 gap-6 overflow-clip">
          <SideBar />
          
      <div className="h-screen flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

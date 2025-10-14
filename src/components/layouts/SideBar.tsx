import { Link, useLocation } from "react-router-dom";
import { LogOut, Globe, ClipboardClock } from "lucide-react";
import { useAuth } from "../../features/auth/contexts/AuthContext";

export default function SideBar() {
  const location = useLocation();
  const { logout } = useAuth();

  const menus = [
    { name: "packages", icon: Globe, path: "/dashboard/package" },
    { name: "analytics", icon: ClipboardClock, path: "/dashboard/transaction" },
  ];

  return (
    <aside className="flex flex-col justify-between items-center h-[100%] w-20 bg-white rounded-2xl shadow-2xl py-6">
      <div className="flex flex-col gap-6 items-center">
        {menus.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`p-3 rounded-xl transition-all duration-200 shadow-sm ${
                isActive
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                  : "text-emerald-600 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-emerald-700"
              }`}
            >
              <Icon size={22} strokeWidth={2} />
            </Link>
          );
        })}
      </div>

      <button
        onClick={logout}
        className="p-3 rounded-xl text-red-400 cursor-pointer hover:text-red-500 hover:bg-gradient-to-r hover:from-red-100 hover:to-red-200 transition-all duration-200"
      >
        <LogOut size={22} strokeWidth={2} />
      </button>
    </aside>
    
  );
}

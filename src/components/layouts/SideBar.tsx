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
    <>
      <aside
        className=" hidden md:flex flex-col justify-between items-center h-full w-20
      bg-white border border-gray-200 rounded-2xl py-6"
      >
        <nav className="flex flex-col gap-4 items-center">
          {menus.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                title={item.name}
                className={[
                  "relative flex h-11 w-11 items-center justify-center rounded-xl",
                  "text-gray-700 hover:bg-gray-50",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600",
                  isActive
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/30"
                    : "",
                ].join(" ")}
              >
                {isActive && (
                  <span className="absolute left-0 h-6 w-1 rounded-r bg-emerald-600" />
                )}
                <Icon size={20} strokeWidth={2} />
              </Link>
            );
          })}
        </nav>

        <button
          onClick={logout}
          title="logout"
          className="flex h-11 w-11 items-center justify-center rounded-xl cursor-pointer
        text-gray-500 hover:text-red-600 hover:bg-gray-50
        focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
        >
          <LogOut size={20} strokeWidth={2} />
        </button>
      </aside>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
        {menus.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center text-sm ${
                isActive ? "text-emerald-600" : "text-gray-500"
              }`}
            >
              <Icon size={20} />
              <span className="text-xs">{item.name}</span>
            </Link>
          );
        })}
        <button
          onClick={logout}
          title="logout"
          className=" flex flex-col items-center text-sm text-red-300 hover:text-red-600 cursor-pointer"
        >
          <LogOut size={20} strokeWidth={2} />
          <span className="text-xs block">logout</span>
        </button>
      </div>
    </>
  );
}

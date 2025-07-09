import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  Settings,
  TrendingUp,
  Users,
  Warehouse,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    {
      path: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      roles: ["admin", "manager", "staff"],
    },
    {
      path: "/products",
      icon: Package,
      label: "Products",
      roles: ["admin", "manager", "staff"],
    },
    {
      path: "/inventory",
      icon: TrendingUp,
      label: "Inventory",
      roles: ["admin", "manager", "staff"],
    },
    {
      path: "/locations",
      icon: MapPin,
      label: "Locations",
      roles: ["admin", "manager"],
    },
    {
      path: "/reports",
      icon: FileText,
      label: "Reports",
      roles: ["admin", "manager"],
    },
    {
      path: "/users",
      icon: Users,
      label: "Users",
      roles: ["admin"],
    },
    {
      path: "/settings",
      icon: Settings,
      label: "Settings",
      roles: ["admin", "manager"],
    },
  ];

  const filterMenuItem = menuItems.filter(
    (item) => user && item.roles.includes(user.role)
  );
  return (
    <div className="h-screen w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Warehouse className="w-6 h-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">WarehouseMS</h1>
            <p className="text-sm text-gray-500">Management System</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {filterMenuItem.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 mr-3 ${
                      isActive ? "text-blue-700" : "text-gray-400"
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

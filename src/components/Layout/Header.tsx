import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { Bell, Menu, Search } from "lucide-react";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transistion-colors">
            <Menu onClick={onToggleSidebar} className="w-5 h-5 text-gray-600" />
          </button>

          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search Products location.."
              className="pl-10 pr-4 py-2 w-96 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute w-4 h-4 -top-1 -right-1">
              <span className="text-xs text-dark font-medium">3</span>
            </span>
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">
                {user?.firstName}
                {user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

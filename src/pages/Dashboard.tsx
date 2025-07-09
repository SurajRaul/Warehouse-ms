import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useEffect } from "react";
import { setMetrics } from "../redux/slices/dashboardSlice";
import { Package, TrendingUp } from "lucide-react";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { metrics } = useSelector((state: RootState) => state.dashboard);
  const { user } = useSelector((state: RootState) => state.auth);
  const mockMetrics = {
    totalProducts: 1247,
    lowStockItems: 23,
    outOfStockItems: 5,
    totalTransactions: 342,
    recentTransactions: [
      {
        id: "1",
        productName: "Wireless Headphones",
        type: "out",
        quantity: 5,
        timestamp: "2024-01-15 10:30",
        user: "John Smith",
      },
      {
        id: "2",
        productName: "Bluetooth Speaker",
        type: "in",
        quantity: 10,
        timestamp: "2024-01-15 09:15",
        user: "Jane Doe",
      },
      {
        id: "3",
        productName: "USB Cable",
        type: "out",
        quantity: 15,
        timestamp: "2024-01-15 08:45",
        user: "Bob Johnson",
      },
      {
        id: "4",
        productName: "Phone Case",
        type: "in",
        quantity: 25,
        timestamp: "2024-01-15 08:00",
        user: "Alice Brown",
      },
      {
        id: "5",
        productName: "Laptop Stand",
        type: "out",
        quantity: 3,
        timestamp: "2024-01-14 16:30",
        user: "Charlie Davis",
      },
    ],
    categoryBreakdown: {
      Electronics: 450,
      Accessories: 320,
      "Home & Garden": 280,
      Sports: 197,
    },
    stockAlerts: [
      {
        id: "1",
        productName: "Wireless Mouse",
        currentStock: 5,
        minStock: 10,
        location: "A1-B2",
      },
      {
        id: "2",
        productName: "Keyboard",
        currentStock: 2,
        minStock: 8,
        location: "A2-B1",
      },
      {
        id: "3",
        productName: "Monitor Stand",
        currentStock: 1,
        minStock: 5,
        location: "B1-C3",
      },
    ],
  };
  useEffect(() => {
    dispatch(setMetrics(mockMetrics));
  }, [dispatch]);

  const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-ceneter justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend ?? (
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {<Icon className="w-6 h-6 text-white" />}
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Products"
        value={metrics.totalProducts}
        icon={Package}
        color="bg-blue-500"
        trend="+12% from last month"
      />
    </div>
  );
};

export default Dashboard;

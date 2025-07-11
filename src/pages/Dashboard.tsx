import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useEffect } from "react";
import { setMetrics } from "../redux/slices/dashboardSlice";
import {
  Activity,
  AlertTriangle,
  Package,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

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
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.firstName}</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={metrics.totalProducts}
          icon={Package}
          color="bg-blue-500"
          trend="+12% from last month"
        />
        <StatCard
          title="Low Stock Items"
          value={metrics.lowStockItems}
          icon={TrendingDown}
          color="bg-yellow-500"
        />
        <StatCard
          title="Out of Stock"
          value={metrics.outOfStockItems}
          icon={AlertTriangle}
          color="bg-red-500"
        />
        <StatCard
          title="Total Transactions"
          value={metrics.totalTransactions}
          icon={Activity}
          color="bg-green-500"
          trend="+8% from last week"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transaction */}
        <div className="bg-white shadow-sm p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Transaction
          </h3>
          <div className="space-y-4">
            {metrics.recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.type === "in"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.type === "in" ? "+" : "-"}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {transaction.productName}
                    </p>
                    <p className="font-medium text-gray-900">
                      {transaction.user}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {transaction.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    {transaction.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Stock Alert */}
        <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Stock Alert
          </h3>
          <div className="space-y-4">
            {metrics.stockAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between bg-red-50 rounded-lg p-3 border border-red-200"
              >
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="font-semibold text-red-900">
                      {alert.productName}
                    </p>
                    <p className="text-sm text-red-500">
                      Location: {alert.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-900">
                    {alert.currentStock}/{alert.minStock}
                  </p>
                  <p className="text-sm text-red-500">Current/Min</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Category Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(metrics.categoryBreakdown).map(
            ([category, count]) => (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-sm text-gray-600">{category}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

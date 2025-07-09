import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface DashboardMetrics {
  totalProducts: number;
  lowStockItems: number;
  outOfStockItems: number;
  totalTransactions: number;
  recentTransactions: any[];
  categoryBreakdown: { [key: string]: number };
  stockAlerts: Array<{
    id: string;
    productName: string;
    currentStock: number;
    minStock: number;
    location: string;
  }>;
}

export interface DashboardState {
  metrics: DashboardMetrics;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  metrics: {
    totalProducts: 0,
    lowStockItems: 0,
    outOfStockItems: 0,
    totalTransactions: 0,
    recentTransactions: [],
    categoryBreakdown: {},
    stockAlerts: [],
  },
  loading: false,
  error: null,
};
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setMetrics: (state, action: PayloadAction<DashboardMetrics>) => {
      state.metrics = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setMetrics, setLoading, setError } = dashboardSlice.actions;

export default dashboardSlice.reducer;

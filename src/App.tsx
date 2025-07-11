import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import type { RootState } from "./redux/store";
import { useEffect } from "react";
import { loadUserFromStorage } from "./redux/slices/authSlice";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout/Layout";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <Layout />
            // </ProtectedRoute>
          }
        >
          {/* <Route
          path="login"
          element={
            !isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />
          }
        />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} /> */}
          {/* <Route path="inventory" element={<Layout />} /> */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

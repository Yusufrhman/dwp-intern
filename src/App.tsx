// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import PackagePage from "./features/package/pages/PackagePage";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import DashboardLayout from "./components/layouts/DashboardLayout";
import TransactionPage from "./features/transaction/pages/TransactionPage";
import AdminPackagePage from "./features/package/pages/AdminPackagePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="package" replace />} />
          <Route path="package" element={<PackagePage />} />
          <Route path="transaction" element={<TransactionPage />} />
        </Route>
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Navigate to="package" replace />} />
          <Route path="package" element={<AdminPackagePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

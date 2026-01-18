import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminUsers from "./pages/AdminUsers";
import RequireAdmin from "./components/RequireAdmin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/admin/users"
        element={
          <RequireAdmin>
            <AdminUsers />
          </RequireAdmin>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

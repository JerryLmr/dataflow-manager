import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import AdminUsers from "../pages/AdminUsers";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

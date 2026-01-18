import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");

  if (!token || !userStr) {
    // ❌ 没登录
    return <Navigate to="/" replace />;
  }

  const user = JSON.parse(userStr);

  if (user.role !== "ADMIN") {
    // ❌ 已登录但不是管理员
    return <Navigate to="/" replace />;
  }

  // ✅ 已登录 + 是 ADMIN
  return children;
}

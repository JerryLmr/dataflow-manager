import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsers(res.data.users))
      .catch((err) => {
        console.error(err);
        // token 无效 / 过期，直接登出
        handleLogout();
      });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>User Management</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.email} — {u.role} — {u.is_active ? "Active" : "Disabled"}
          </li>
        ))}
      </ul>
    </div>
  );
}

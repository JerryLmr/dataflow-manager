import api from "../api/axios";

export async function login(email, password) {
  const res = await api.post("/auth/login", {
    email,
    password,
  });

  const { token, user } = res.data.result;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

import { listUsers, setUserActive } from "../services/admin.service.js";

export async function listUserController(req, res) {
  try {
    const users = await listUsers();
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch users",
    });
  }
}

export async function setUserActiveController(req, res) {
  const { id } = req.params;
  const { is_active } = req.body;

  if (typeof is_active !== "boolean") {
    return res.status(400).json({
      message: "is_active must be boolean",
    });
  }

  try {
    await setUserActive(Number(id), is_active);
    return res.status(200).json({ message: "User updated" });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
}

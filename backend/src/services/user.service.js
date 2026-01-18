import { findUserById } from "../models/user.model.js";

export async function getCurrentUser(userId) {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (Number(user.is_active) !== 1) {
    throw new Error("User account is disabled");
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    is_active: Boolean(user.is_active),
  };
}

import { findAllUsers, updateUserActiveStatus } from "../models/user.model.js";

export async function listUsers() {
  return await findAllUsers();
}

export async function setUserActive(userId, isActive) {
  const success = await updateUserActiveStatus(userId, isActive);

  if (!success) {
    throw new Error("User not found");
  }
}

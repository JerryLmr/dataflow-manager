import bcrypt from "bcrypt";
import { findUserByEmail } from "../models/user.model.js";
//import { use } from "react";

/**
 * Authenticate user with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Object} user (without password_hash)
 * @throws {Error} if authentication fails
 */

export async function login(email, password) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }
  if (!user.is_active) {
    throw new Error("User account is disabled");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
}

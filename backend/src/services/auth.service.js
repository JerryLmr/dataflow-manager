import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../models/user.model.js";
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
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
  return {
    user: { id: user.id, email: user.email, role: user.role },
    token,
  };
}

export async function register(email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const userId = await createUser({
    email,
    passwordHash,
    role: "USER",
  });

  return {
    id: userId,
    email,
    role: "USER",
  };
}

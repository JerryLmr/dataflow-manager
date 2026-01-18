import pool from "./db.js";

/**
 * Find a user by email
 * @param {string} email
 * @returns {Object|null}
 */
export async function findUserByEmail(email) {
  const [rows] = await pool.query(
    `SELECT id, email, password_hash, role, is_active
         FROM users
         where email = ?`,
    [email],
  );
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Create a new user
 * @param {Object} user
 * @param {string} user.email
 * @param {string} user.passwordHash
 * @param {string} user.role
 * @returns {number} inserted user id
 */

export async function createUser({ email, passwordHash, role = "USER" }) {
  const [result] = await pool.query(
    `INSERT INTO users(email, password_hash, role)
         VALUES (?, ?, ?)`,
    [email, passwordHash, role],
  );
  return result.insertId;
}

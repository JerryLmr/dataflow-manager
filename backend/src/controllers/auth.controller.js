import { login, register } from "../services/auth.service.js";

/**
 * POST /api/auth/login
 */
export async function loginController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    const result = await login(email, password);

    return res.status(200).json({
      result,
    });
  } catch (err) {
    return res.status(401).json({
      message: err.message,
    });
  }
}

export async function registerController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    const user = await register(email, password);

    return res.status(201).json({
      user,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
}

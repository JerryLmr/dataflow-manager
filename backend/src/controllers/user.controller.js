import { getCurrentUser } from "../services/user.service.js";

export async function meController(req, res) {
  try {
    const userId = req.user.userId;

    const user = await getCurrentUser(userId);

    return res.status(200).json({
      user,
    });
  } catch (err) {
    return res.status(401).json({
      message: err.message,
    });
  }
}

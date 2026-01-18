/**
 * Role-based authorization middleware
 * @param {Array<string>} allowedRoles
 */
export function authorize(allowedRoles = []) {
  return (req, res, next) => {
    const { role } = req.user || {};

    if (!role) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        message: "Forbidden: insufficient permissions",
      });
    }
    next();
  };
}

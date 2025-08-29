// middleware/checkPermission.js

const rolePermissions = require("../permissions/rolePermissions");

const checkPermission = (permission) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole || !rolePermissions[userRole]) {
      return res.status(403).json({ message: "Access Denied: No role" });
    }

    if (!rolePermissions[userRole].includes(permission)) {
      return res.status(403).json({ message: "Access Denied: Permission denied" });
    }

    next();
  };
};

module.exports = checkPermission;

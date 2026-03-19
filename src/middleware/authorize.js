const Roles = require("../constants/Roles");

function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({error: "Authentication required."});
    }
    const role = req.user?.role
    if (role === Roles.SUPER_ADMIN) {
      return next();
    }
    if (!roles.includes(role)) {
      return res.status(403).send({error: "You do not have permission to access this resource"});
    }

    next();
  };
}
module.exports = authorize;

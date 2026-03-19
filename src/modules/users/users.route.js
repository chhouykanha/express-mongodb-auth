const { Router } = require("express");
const {
  updateUserProfile,
  adminListUsers,
  adminGetUser,
  adminSetUserStatus,
  adminSetUserRole,
} = require("./users.controller");
const { requireAuth, requireEmailVerified } = require("../../middleware/auth");
const Roles = require("../../constants/Roles");
const authorize = require("../../middleware/authorize");

const router = Router();

router.patch("/me", requireAuth, requireEmailVerified, updateUserProfile);

// == Admin routes (require admin role) ============================
router.get("/", requireAuth, authorize(Roles.ADMIN), adminListUsers);
router.get("/:id", requireAuth, authorize(Roles.ADMIN), adminGetUser);
router.patch(
  "/:id/status",
  requireAuth,
  authorize(Roles.ADMIN),
  adminSetUserStatus,
);
router.patch(
  "/:id/role",
  requireAuth,
  authorize(Roles.ADMIN),
  adminSetUserRole,
);

module.exports = router;

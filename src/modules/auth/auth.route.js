const { Router } = require("express");
const { requireAuth, requireEmailVerified } = require("../../middleware/auth");
const {
  changePassword,
  forgotPassword,
  getSessions,
  login,
  logout,
  logoutAll,
  me,
  refresh,
  register,
  resendVerification,
  resetPassword,
  verifyEmail,
  deleteUserAccount,
  loginWithTelegram,
} = require("./auth.controller");

const router = Router();

// ─── Public routes (no auth needed) ──────────────────────────────────────────
router.post("/register", register);
router.post("/login", login);
router.post("/login/telegram", loginWithTelegram);
router.post("/refresh", refresh);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerification);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// ─── Protected routes (auth required) ────────────────────────────────────────
router.post("/logout", requireAuth, logout);
router.post("/logout-all", requireAuth, logoutAll);
router.get("/me", requireAuth, me);
router.get("/sessions", requireAuth, getSessions);

// ─── Sensitive routes (auth + email verified required) ───────────────────────
router.delete("/account", requireAuth,requireEmailVerified, deleteUserAccount);
router.post("/change-password", requireAuth, requireEmailVerified, changePassword);

module.exports = router;

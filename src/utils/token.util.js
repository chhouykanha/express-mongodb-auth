const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { config } = require("../config/env");

function signAccessToken(payload) {
  return jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn || "15m",
    issuer: "express-jwt-auth",
  });
}

function signRefreshToken(payload) {
  return jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn || "7d",
    issuer: "express-jwt-auth",
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, config.jwt.accessSecret, {
    issuer: "express-jwt-auth",
  });
}

function verifyRefreshToken(token) {
  return jwt.verify(token, config.jwt.refreshSecret, {
    issuer: "express-jwt-auth",
  });
}

function generateToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString("hex");
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function addMinutes(minutes) {
  return new Date(Date.now() + minutes * 60 * 1000);
}

function addDays(days) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

function parseDuration(str) {
  const unit = str.slice(-1);
  const value = Number.parseInt(str.slice(0, -1), 10);
  const multipliers = {
    s: 1000,
    m: 60_000,
    h: 3_600_000,
    d: 86_400_000,
  };

  return value * (multipliers[unit] || 1000);
}

function expiryFromEnv(envKey, fallback = "7d") {
  return new Date(Date.now() + parseDuration(process.env[envKey] || fallback));
}

module.exports = {
  addDays,
  addMinutes,
  expiryFromEnv,
  generateToken,
  hashToken,
  parseDuration,
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};

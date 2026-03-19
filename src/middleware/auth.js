const { User } = require("../modules/users/users.model");
const { verifyAccessToken } = require("../utils/token.util");

async function requireAuth(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ error: "No access token provided" });
    }

    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    req.userId = user._id.toString();
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Access token expired",
        code: "TOKEN_EXPIRED",
      });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid access token" });
    }

    return next(err);
  }
}

async function optionalAuth(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token) {
      return next();
    }

    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.sub);

    if (user) {
      req.user = user;
      req.userId = user._id.toString();
    }
  } catch (error) {
    // Treat invalid optional auth the same as no auth.
  }

  return next();
}

function requireEmailVerified(req, res, next) {
  if (!req.user?.emailVerified) {
    return res.status(403).json({
      error: "Email not verified",
      code: "EMAIL_NOT_VERIFIED",
    });
  }

  return next();
}

function extractToken(req) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  if (req.cookies?.accessToken) {
    return req.cookies.accessToken;
  }

  return null;
}

module.exports = {
  optionalAuth,
  requireAuth,
  requireEmailVerified,
};

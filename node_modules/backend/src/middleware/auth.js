  const jwt = require("jsonwebtoken");
  const { HttpError } = require("../utils/httpError");
  const { User } = require("../models/User");

  async function requireAuth(req, _res, next) {
    try {
      const header = req.headers.authorization || "";
      const token =
        header.startsWith("Bearer ") ? header.slice("Bearer ".length) : null;

      if (!token) throw new HttpError(401, "Unauthorized");

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(payload.sub).select("-passwordHash");
      if (!user) throw new HttpError(401, "Unauthorized");

      req.user = user;
      next();
    } catch (_e) {
      next(new HttpError(401, "Unauthorized"));
    }
  }

  async function optionalAuth(req, _res, next) {
    try {
      const header = req.headers.authorization || "";
      const token =
        header.startsWith("Bearer ") ? header.slice("Bearer ".length) : null;
      if (token) {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.sub).select("-passwordHash");
        if (user) req.user = user;
      }
    } catch {
      /* ignore invalid token */
    }
    next();
  }

  function requireRole(role) {
    return function roleMiddleware(req, _res, next) {
      if (!req.user) return next(new HttpError(401, "Unauthorized"));
      if (req.user.role !== role) return next(new HttpError(403, "Forbidden"));
      next();
    };
  }

  module.exports = { requireAuth, optionalAuth, requireRole };


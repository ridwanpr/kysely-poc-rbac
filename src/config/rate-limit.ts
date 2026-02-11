import { rateLimit } from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15min
  limit: process.env.NODE_ENV === "production" ? 5 : 100,
  message: {
    success: false,
    message: "Too many login attempts, please try again after 15 minutes",
  },
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15min
  limit: process.env.NODE_ENV === "production" ? 1000 : 100000,
  message: {
    success: false,
    message: "You are rate limited, please try again after 15 minutes",
  },
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

export { authLimiter, globalLimiter };

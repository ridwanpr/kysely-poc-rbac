import cors from "cors";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import { trimMiddleware } from "../http/middlewares/trim-middleware.js";
import { userRouter } from "../routes/user-route.js";
import { authRouter } from "../routes/auth-route.js";
import { errorMiddleware } from "../http/middlewares/error-middleware.js";
import { redisClient } from "./redis.js";
import { RedisStore } from "connect-redis";
import { roleRouter } from "../routes/role-route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || "super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 60 * 60 * 1000 }, // 1 hour
  }),
);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15min
  limit: 10,
  message: {
    error: "Too many login attempts, please try again after 15 minutes",
  },
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15min
  limit: 1000, // Generous
  message: {
    error: "You are rate limited, please try again after 15 minutes",
  },
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use(globalLimiter);

app.use(trimMiddleware);

app.use("/api/users", userRouter);
app.use("/api/auth", authLimiter, authRouter);
app.use("/api/", roleRouter);

app.use((_req, res) => {
  return res.sendStatus(404);
});

app.use(errorMiddleware);

export { app };

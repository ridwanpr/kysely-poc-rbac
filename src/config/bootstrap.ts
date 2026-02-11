import cors from "cors";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import { trimMiddleware } from "../http/middlewares/trim-middleware.js";
import { errorMiddleware } from "../http/middlewares/error-middleware.js";
import { redisClient } from "./redis.js";
import { RedisStore } from "connect-redis";
import { authLimiter, globalLimiter } from "./rate-limit.js";
import {
  userRouter,
  authRouter,
  roleRouter,
  permissionRouter,
} from "./container.js";

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

app.use(globalLimiter);

app.use(trimMiddleware);

app.use("/api/users", userRouter);
app.use("/api/auth", authLimiter, authRouter);
app.use("/api/", roleRouter);
app.use("/api/", permissionRouter);

app.use((_req, res) => {
  return res.sendStatus(404);
});

app.use(errorMiddleware);

export { app };

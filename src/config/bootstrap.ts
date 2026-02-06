import cors from "cors";
import express from "express";
// import session from "express-session";
import cookieParser from "cookie-parser";
import { trimMiddleware } from "../http/middlewares/trim-middleware.js";
import { userRouter } from "../routes/user-route.js";
import { authRouter } from "../routes/auth-route.js";
import { errorMiddleware } from "../http/middlewares/error-middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(trimMiddleware);

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use((_req, res) => {
  return res.sendStatus(404);
});

app.use(errorMiddleware);

export { app };

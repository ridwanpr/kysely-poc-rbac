import cors from "cors";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import { trimMiddleware } from "../http/middlewares/trim-middleware.js";
import { userRouter } from "../routes/user-route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || "8ceedb57ca84b0b13f2645fc6f1b0d48",
    cookie: {
      secure: process.env.ENVIRONMENT === "production" ? true : false,
    },
  }),
);

app.use(trimMiddleware);

app.use("/api/users", userRouter);

app.use((_req, res) => {
  return res.sendStatus(404);
});

export { app };

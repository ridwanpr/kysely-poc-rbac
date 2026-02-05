import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { apiRouter } from "../routes/api-route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", apiRouter);

app.use((_req, res, _next) => {
  res.sendStatus(404);
});

export { app };

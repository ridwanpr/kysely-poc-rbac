/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from "express";
import { ResponseError } from "../errors/handle-error.js";
import { logger } from "../../config/logger.js";

export const errorMiddleware = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error instanceof ResponseError) {
    return response.status(error.status).json({
      success: false,
      type: "Response Error",
      message: error.message,
    });
  } else {
    const isDevEnv = process.env.NODE_ENV === "development" ? true : false;
    if (isDevEnv) console.log(error);

    logger.error(error.message, { stack: error.stack });
    return response.status(500).json({
      success: false,
      type: "Internal Server Error",
      message: error.message,
      stack: isDevEnv ? error.stack : null,
    });
  }
};

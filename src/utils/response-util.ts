import type { Response } from "express";
import type { SuccessResponse } from "../types/response-type.js";

export const sendSuccess = <T = void>(
  res: Response,
  data?: T,
  message: string = "Success",
  statusCode: number = 200,
): Response => {
  const response: SuccessResponse<T> = {
    success: true,
    message,
    ...(data && { data }),
  };
  return res.status(statusCode).json(response);
};

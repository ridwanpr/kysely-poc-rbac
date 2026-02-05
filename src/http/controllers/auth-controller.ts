import type { Request, Response } from "express";

const checkHealth = (req: Request, res: Response) => {
  return res.json({
    message: "Hi there",
  });
};

export { checkHealth };

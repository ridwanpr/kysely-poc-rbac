import winston from "winston";
import "winston-daily-rotate-file";
import path from "path";

const logDirectory = path.join(process.cwd(), "storage/logs");

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [],
});

if (process.env.NODE_ENV === "production") {
  logger.add(
    new winston.transports.DailyRotateFile({
      level: "error",
      dirname: logDirectory,
      filename: "error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  );

  logger.add(
    new winston.transports.DailyRotateFile({
      dirname: logDirectory,
      filename: "combined-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  );
}

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

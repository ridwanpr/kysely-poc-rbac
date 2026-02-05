import winston from "winston";
import path from "path";
import "winston-daily-rotate-file";

const isProd = process.env.NODE_ENV === "production";
const isTest = process.env.NODE_ENV === "test";

// Format
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaString =
      Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : "";
    return `[${timestamp}] ${level}: ${message}${metaString}`;
  }),
);

// Transport
const transports: winston.transport[] = [];

// write to disk on production
if (isProd) {
  transports.push(
    new winston.transports.DailyRotateFile({
      filename: path.join(process.cwd(), "storage/logs/error-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxSize: "20m",
      maxFiles: "30d",
      format: fileFormat,
    }),

    new winston.transports.DailyRotateFile({
      filename: path.join(process.cwd(), "storage/logs/app-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      level: "info",
      maxSize: "20m",
      maxFiles: "14d",
      format: fileFormat,
    }),
  );
}

// write to console on dev
if (!isProd && !isTest) {
  transports.push(
    new winston.transports.Console({
      level: "debug",
      format: consoleFormat,
    }),
  );
}

/**
 * Logger instance
 */
export const logger = winston.createLogger({
  level: isProd ? "info" : "debug",
  silent: isTest,
  transports,
  exitOnError: false,
});

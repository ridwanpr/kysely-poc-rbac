import { createClient } from "redis";

const redisClient = await createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

(async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis Client");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
  }
})();

export { redisClient };
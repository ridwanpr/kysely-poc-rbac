import "dotenv/config";
import { app } from "./config/bootstrap.js";
import { logger } from "./config/logger.js";

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  logger.info(`Server running on PORT ${PORT}`);
});

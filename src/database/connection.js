const { default: mongoose } = require("mongoose");
const { config } = require("../config/env");

const connectMongoDB = async () => {
  try {
    console.info(" > Initializing MongoDB.");
    await mongoose.connect(config.databaseUrl);
  } catch (error) {
    console.error(`⛔ Failed to connect to MongoDB, ${error.message}`);
    console.error("🛑 Exiting ...");
    process.exit(0);
  }
};

/**
 * Logs when MongoDB connection is successfully established.
 */
mongoose.connection.on("connected", () =>
  console.info("✅ Database (MongoDB) Connected."),
);

/**
 * Logs errors during MongoDB connection.
 */
mongoose.connection.on("err", (err) =>
  console.debug(`⛔ Failed to connect to MongoDB, ${err.message}`),
);

/**
 * Logs when MongoDB connection is disconnected.
 */
mongoose.connection.on("disconnected", () =>
  console.error("❌ MongoDB Disconnected"),
);

/**
 * Gracefully closes MongoDB connection on app exit (CTRL+C).
 */
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
module.exports = connectMongoDB;

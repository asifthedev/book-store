import mongoose from "mongoose";

async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error(
      `[MongoDB] Error: MONGODB_URI enviornment variable is not defined`,
    );
    process.exit(1);
  }

  try {
    const connectionInstance = await mongoose.connect(MONGODB_URI);
    console.log(`[MongoDB] connected successfully!`);

    connectionInstance.connection.on("error", (error) => {
      console.error(`[MongoDB] Error: ${error.message}`);
    });

    connectionInstance.connection.on("disconnected", () => {
      console.log(`[MongoDB] disconnected!`);
    });

    connectionInstance.connection.on("reconnnected", () => {
      console.log(`[MongoDB] reconnected!`);
    });

    return connectionInstance;
  } catch (error) {
    console.error(`[MongoDB] Error: ${(error as any).messag}`);
    process.exit(1);
  }
}

export default connectDB;

import mongoose from "mongoose";

export async function useDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(process.env.MONGODB_URI as string,
    {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }
  );
}

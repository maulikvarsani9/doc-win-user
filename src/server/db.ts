import mongoose from "mongoose";

const g = globalThis as unknown as { _docwinMongo?: Promise<typeof mongoose> };

export function connectDb() {
  g._docwinMongo ??= mongoose
    .connect(process.env.MONGO_URL!, { dbName: process.env.DB_NAME, serverSelectionTimeoutMS: 5000 })
    .catch((e) => {
      g._docwinMongo = undefined;
      throw e;
    });
  return g._docwinMongo;
}

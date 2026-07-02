import { MongoClient } from "mongodb";

// Reuse one client across hot reloads / route renders.
const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };

export const DB_NAME = "sumtingblue";
export const CONTENT_COLLECTION = "content";
export const CONTENT_DOC_ID = "main";

export function getMongoClient(): MongoClient | null {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
    });
  }
  return globalForMongo._mongoClient;
}

// ...existing code...
import dotenv from "dotenv";
import path from "path";
import { defineConfig } from "prisma/config";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "Missing required environment variable DATABASE_URL. Create a .env in the server folder or set the variable in your environment."
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations", 
  },
  engine: "classic",
  datasource: {
    url: databaseUrl,
  },
});
// ...existing code...
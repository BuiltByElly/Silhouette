import { defineConfig } from "drizzle-kit";


export default defineConfig({
  dialect: "sqlite",
  out:"./asset/drizzle",
  schema: "./src/database/schema.ts",
});

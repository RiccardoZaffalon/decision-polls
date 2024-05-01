import * as dotenv from "dotenv";
dotenv.config();

export default {
    schema: "./src/lib/db/schema.js",
    out: "./drizzle/migrations",
    driver: "turso",
    dbCredentials: {
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    },
}
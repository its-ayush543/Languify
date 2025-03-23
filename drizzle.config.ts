import "dotenv/config";
import type {Config} from "drizzle-kit";
import { connect } from "http2";

export default{
    schema: "db/schema.ts",
    out: "./drizzle",
    dialect:"postgresql",
    dbCredentials: {
       url: process.env.DATABASE_URL || "",
    },
}satisfies Config;
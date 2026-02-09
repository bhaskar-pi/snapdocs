import { drizzle } from "drizzle-orm/node-postgres";
import pool from "./pool-client";

export const db = drizzle(pool);

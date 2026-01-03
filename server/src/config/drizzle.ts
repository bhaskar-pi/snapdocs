import { drizzle } from "drizzle-orm/node-postgres";
import pool from "./database";

export const db = drizzle(pool);

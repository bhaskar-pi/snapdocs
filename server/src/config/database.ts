import { Pool } from "pg";
import env from "./env";

const connectionString = env.SUPABASE_DB_URL;

const db = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default db;

import { Pool } from "pg";
import env from "@config/env";
import { Environment } from "@enums/environment";

const connectionString = env.SUPABASE_DB_URL;

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: env.NODE_ENV === Environment.PRODUCTION,
  },
});

export default pool;

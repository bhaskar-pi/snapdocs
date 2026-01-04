import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT!,
  BASE_URL: process.env.BASE_URL!,
  API_PATH: process.env.API_PATH!,
  NODE_ENV: process.env.NODE_ENV!,

  SUPABASE_PROJECT_URL: process.env.SUPABASE_PROJECT_URL!,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  SUPABASE_DB_URL: process.env.SUPABASE_DB_URL!,

  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET!,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET!,
};

export default env;

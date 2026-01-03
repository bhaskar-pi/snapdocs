import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT!,
  BASE_URL: process.env.BASE_URL!,
  API_PATH: process.env.API_PATH!,
  SUPABASE_PROJECT_URL: process.env.SUPABASE_PROJECT_URL!,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  SUPABASE_DB_URL: process.env.SUPABASE_DB_URL!
};

export default env;

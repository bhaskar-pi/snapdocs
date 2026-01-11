import dotenv from "dotenv";

dotenv.config();

function getEnv(name: keyof NodeJS.ProcessEnv): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const env = {
  PORT: getEnv("PORT"),
  BASE_URL: getEnv("BASE_URL"),
  API_PATH: getEnv("API_PATH"),
  NODE_ENV: getEnv("NODE_ENV"),
  SUPABASE_PROJECT_URL: getEnv("SUPABASE_PROJECT_URL"),
  SUPABASE_ANON_KEY: getEnv("SUPABASE_ANON_KEY"),
  SUPABASE_DB_URL: getEnv("SUPABASE_DB_URL"),
  JWT_ACCESS_TOKEN_SECRET: getEnv("JWT_ACCESS_TOKEN_SECRET"),
  JWT_REFRESH_TOKEN_SECRET: getEnv("JWT_REFRESH_TOKEN_SECRET"),
  APP_URL: getEnv("APP_URL"),
};

export default env;

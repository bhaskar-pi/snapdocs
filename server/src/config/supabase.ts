import { createClient } from "@supabase/supabase-js";
import env from "./env";

const superbaseUrl = env.SUPABASE_PROJECT_URL;
const superbaseAnonKey = env.SUPABASE_ANON_KEY;

export const superbase = createClient(superbaseUrl, superbaseAnonKey);

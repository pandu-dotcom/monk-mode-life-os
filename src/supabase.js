import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eggqnnvpprxrhlnbnbvl.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZ3FubnZwcHJ4cmhsbmJuYnZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MjM3NTYsImV4cCI6MjA5NTk5OTc1Nn0.8RP7LPanfaQcYy418Q54v-YbP0HJPYQkNKM4cBLs3GY";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
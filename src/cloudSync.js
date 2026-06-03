import { supabase } from "./supabase";

export async function saveCloudData(email) {
  const cleanEmail = email.trim().toLowerCase();

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const payload = {
    email: cleanEmail,
    tasks,
  };

  const { error } = await supabase
    .from("monkos_users")
    .upsert(payload, {
      onConflict: "email",
    });

  if (error) throw error;
}

export async function loadCloudData(email) {
  const cleanEmail = email.trim().toLowerCase();

  const { data, error } = await supabase
    .from("monkos_users")
    .select("*")
    .eq("email", cleanEmail)
    .limit(1)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    throw new Error("No cloud data found for this email");
  }

  localStorage.setItem(
    "tasks",
    JSON.stringify(data.tasks || [])
  );

  return data;
}
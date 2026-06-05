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
  const { data, error } = await supabase
    .from("monkos_users")
    .select("*")
    .limit(1)
    .single();

  if (error) throw error;

  localStorage.setItem(
    "tasks",
    JSON.stringify(data.tasks || [])
  );

  alert("Loaded " + (data.email || "unknown"));

  return data;
}

 
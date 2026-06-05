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
  alert("TEST VERSION RUNNING");

  localStorage.setItem(
    "tasks",
    JSON.stringify([
      { name: "Cloud Test Success", done: false, points: 0 }
    ])
  );

  return true;
}
 
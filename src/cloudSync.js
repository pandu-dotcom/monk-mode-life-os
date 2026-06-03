import { supabase } from "./supabase";

export async function saveCloudData(email) {
  const cleanEmail = email.trim().toLowerCase();

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const data = {
    email: cleanEmail,
    tasks,
    goals: JSON.parse(localStorage.getItem("goalsV2")) || {},
    night_review:
      JSON.parse(localStorage.getItem("nightReviewHistory")) || {},
    focus_hours: Number(localStorage.getItem("focusHours")) || 0,
    streak: Number(localStorage.getItem("streak")) || 0,
    best_streak: Number(localStorage.getItem("bestStreak")) || 0,
    saved_money: Number(localStorage.getItem("savedMoney")) || 0,
  };

  try {
  const { data, error } = await supabase
    .from("monkos_users")
    .select("*")
    .eq("email", cleanEmail)
    .limit(1)
    .maybeSingle();

  alert("EMAIL=" + cleanEmail);

  if (error) {
    alert("ERROR=" + JSON.stringify(error));
    throw error;
  }

  alert("DATA=" + JSON.stringify(data));

} catch (err) {
  alert("CATCH=" + err.message);
  throw err;
}

export async function loadCloudData(email) {
  const cleanEmail = email.trim().toLowerCase();

  const { data, error } = await supabase
    .from("monkos_users")
    .select("*")
    .eq("email", cleanEmail)
    .limit(1)
    .maybeSingle();
alert("EMAIL=" + cleanEmail);
alert("DATA=" + JSON.stringify(data));
  if (error) throw error;

  if (!data) {
    throw new Error("No cloud data found for this email.");
  }

  localStorage.setItem("tasks", JSON.stringify(data.tasks || []));
  localStorage.setItem("goalsV2", JSON.stringify(data.goals || {}));
  localStorage.setItem(
    "nightReviewHistory",
    JSON.stringify(data.night_review || {})
  );
  localStorage.setItem("focusHours", data.focus_hours || 0);
  localStorage.setItem("streak", data.streak || 0);
  localStorage.setItem("bestStreak", data.best_streak || 0);
  localStorage.setItem("savedMoney", data.saved_money || 0);
}
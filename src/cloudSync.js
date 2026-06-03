import { supabase } from "./supabase";

export async function saveCloudData(email) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const data = {
    email,
    xp: tasks
      .filter((task) => task.done)
      .reduce((sum, task) => sum + task.points, 0),

    streak: Number(localStorage.getItem("streak")) || 0,
    best_streak: Number(localStorage.getItem("bestStreak")) || 0,
    focus_hours: Number(localStorage.getItem("focusHours")) || 0,
    saved_money: Number(localStorage.getItem("savedMoney")) || 0,

    tasks,
    goals: JSON.parse(localStorage.getItem("goalsV2")) || {},
    rewards: {
      weeklyReward: localStorage.getItem("weeklyReward") || "",
      mainReward: localStorage.getItem("mainReward") || "",
      savingGoal: Number(localStorage.getItem("savingGoal")) || 0,
    },
    night_review:
      JSON.parse(localStorage.getItem("nightReviewHistory")) || {},
  };

  const { error } = await supabase
    .from("monkos_users")
    .upsert(data, { onConflict: "email" });

  if (error) throw error;
}

export async function loadCloudData(email) {
  const { data, error } = await supabase
    .from("monkos_users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) throw error;

  localStorage.setItem("streak", data.streak || 0);
  localStorage.setItem("bestStreak", data.best_streak || 0);
  localStorage.setItem("focusHours", data.focus_hours || 0);
  localStorage.setItem("savedMoney", data.saved_money || 0);

  localStorage.setItem("tasks", JSON.stringify(data.tasks || []));
  localStorage.setItem("goalsV2", JSON.stringify(data.goals || {}));
  localStorage.setItem(
    "nightReviewHistory",
    JSON.stringify(data.night_review || {})
  );

  if (data.rewards) {
    localStorage.setItem("weeklyReward", data.rewards.weeklyReward || "");
    localStorage.setItem("mainReward", data.rewards.mainReward || "");
    localStorage.setItem("savingGoal", data.rewards.savingGoal || 0);
  }
}
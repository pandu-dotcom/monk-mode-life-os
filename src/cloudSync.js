export async function loadCloudData(email) {
  const cleanEmail = email.trim().toLowerCase();

  alert("Loading email: " + cleanEmail);

  const { data, error } = await supabase
    .from("monkos_users")
    .select("*")
    .eq("email", cleanEmail)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    throw new Error(
      "No cloud data found for email: " + cleanEmail
    );
  }

  localStorage.setItem(
    "tasks",
    JSON.stringify(data.tasks || [])
  );

  localStorage.setItem(
    "goalsV2",
    JSON.stringify(data.goals || {})
  );

  localStorage.setItem(
    "nightReviewHistory",
    JSON.stringify(data.night_review || {})
  );

  localStorage.setItem(
    "focusHours",
    data.focus_hours || 0
  );

  localStorage.setItem(
    "streak",
    data.streak || 0
  );

  localStorage.setItem(
    "bestStreak",
    data.best_streak || 0
  );

  localStorage.setItem(
    "savedMoney",
    data.saved_money || 0
  );
}
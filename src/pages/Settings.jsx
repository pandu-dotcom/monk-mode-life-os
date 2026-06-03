import { useState, useEffect } from "react";

function Settings() {
  const today = new Date().toDateString();

  const [review, setReview] = useState({
    win: "",
    mistake: "",
    wastedTime: "",
    improve: "",
    tomorrowTask: "",
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("nightReviewHistory");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("nightReviewHistory", JSON.stringify(history));
  }, [history]);

  const updateReview = (key, value) => {
    setReview({ ...review, [key]: value });
  };

  const saveTodayReview = () => {
    setHistory({
      ...history,
      [today]: review,
    });

    alert("✅ Today's review saved!");
  };

  const exportData = () => {
    const data = {
      tasks: JSON.parse(localStorage.getItem("tasks")) || [],
      goals: JSON.parse(localStorage.getItem("goalsV2")) || {},
      nightReviewHistory:
        JSON.parse(localStorage.getItem("nightReviewHistory")) || {},
      focusHours: Number(localStorage.getItem("focusHours")) || 0,
      streak: Number(localStorage.getItem("streak")) || 0,
      bestStreak: Number(localStorage.getItem("bestStreak")) || 0,
      savedMoney: Number(localStorage.getItem("savedMoney")) || 0,
      savingGoal: Number(localStorage.getItem("savingGoal")) || 0,
      weeklyReward: localStorage.getItem("weeklyReward") || "",
      mainReward: localStorage.getItem("mainReward") || "",
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "monkos-backup.json";
    a.click();
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);

      localStorage.setItem("tasks", JSON.stringify(data.tasks || []));
      localStorage.setItem("goalsV2", JSON.stringify(data.goals || {}));
      localStorage.setItem(
        "nightReviewHistory",
        JSON.stringify(data.nightReviewHistory || {})
      );
      localStorage.setItem("focusHours", data.focusHours || 0);
      localStorage.setItem("streak", data.streak || 0);
      localStorage.setItem("bestStreak", data.bestStreak || 0);
      localStorage.setItem("savedMoney", data.savedMoney || 0);
      localStorage.setItem("savingGoal", data.savingGoal || 0);
      localStorage.setItem("weeklyReward", data.weeklyReward || "");
      localStorage.setItem("mainReward", data.mainReward || "");

      alert("✅ Backup restored! Refresh the app.");
    };

    reader.readAsText(file);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", color: "#d4af37" }}>
        🌙 Night Review & Backup Center
      </h1>

      <h2 style={{ textAlign: "center" }}>Today: {today}</h2>

      <ReviewInput label="🏆 Biggest Win" value={review.win} onChange={(v) => updateReview("win", v)} />
      <ReviewInput label="❌ Biggest Mistake" value={review.mistake} onChange={(v) => updateReview("mistake", v)} />
      <ReviewInput label="⏳ What Wasted My Time?" value={review.wastedTime} onChange={(v) => updateReview("wastedTime", v)} />
      <ReviewInput label="🚀 How Will I Improve Tomorrow?" value={review.improve} onChange={(v) => updateReview("improve", v)} />
      <ReviewInput label="🎯 Tomorrow's Most Important Task" value={review.tomorrowTask} onChange={(v) => updateReview("tomorrowTask", v)} />

      <button onClick={saveTodayReview}>Save Today's Review</button>

      <div style={card}>
        <h2 style={{ color: "#d4af37" }}>📖 Review History</h2>

        {Object.keys(history).length === 0 ? (
          <p>No reviews saved yet.</p>
        ) : (
          Object.entries(history).map(([date, item]) => (
            <div key={date} style={historyBox}>
              <h3>{date}</h3>
              <p><strong>Win:</strong> {item.win}</p>
              <p><strong>Mistake:</strong> {item.mistake}</p>
              <p><strong>Wasted Time:</strong> {item.wastedTime}</p>
              <p><strong>Improve:</strong> {item.improve}</p>
              <p><strong>Tomorrow:</strong> {item.tomorrowTask}</p>
            </div>
          ))
        )}
      </div>

      <div style={card}>
        <h2 style={{ color: "#d4af37" }}>💾 Backup & Restore</h2>

        <button onClick={exportData}>Export Backup</button>

        <div style={{ marginTop: "20px" }}>
          <input type="file" accept=".json" onChange={importData} />
        </div>
      </div>
    </div>
  );
}

function ReviewInput({ label, value, onChange }) {
  return (
    <div style={card}>
      <h2>{label}</h2>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} style={textarea} />
    </div>
  );
}

const card = {
  background: "#161616",
  border: "1px solid #2a2a2a",
  borderRadius: "18px",
  padding: "20px",
  marginBottom: "20px",
};

const textarea = {
  width: "100%",
  minHeight: "100px",
  background: "#111",
  color: "white",
  border: "1px solid #333",
  borderRadius: "10px",
  padding: "10px",
};

const historyBox = {
  background: "#111",
  border: "1px solid #333",
  borderRadius: "12px",
  padding: "15px",
  marginBottom: "15px",
};

export default Settings;
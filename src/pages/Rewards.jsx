import { useState, useEffect } from "react";

function Rewards() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const points = tasks
    .filter((task) => task.done)
    .reduce((sum, task) => sum + task.points, 0);

  const [weeklyReward, setWeeklyReward] = useState(
    localStorage.getItem("weeklyReward") || "Diet Coke"
  );

  const [mainReward, setMainReward] = useState(
    localStorage.getItem("mainReward") || "New Phone / Course / Laptop"
  );

  const [savingGoal, setSavingGoal] = useState(
    Number(localStorage.getItem("savingGoal")) || 5000
  );

  const [savedMoney, setSavedMoney] = useState(
    Number(localStorage.getItem("savedMoney")) || 0
  );

  const [addMoney, setAddMoney] = useState("");

  useEffect(() => {
    localStorage.setItem("weeklyReward", weeklyReward);
    localStorage.setItem("mainReward", mainReward);
    localStorage.setItem("savingGoal", savingGoal);
    localStorage.setItem("savedMoney", savedMoney);
  }, [weeklyReward, mainReward, savingGoal, savedMoney]);

  const weeklyTarget = 500;
  const weeklyUnlocked = points >= weeklyTarget;
  const completedTasks = tasks.filter((task) => task.done).length;
  const moneyProgress = Math.min(savedMoney, savingGoal);

  const addSavedMoney = () => {
    if (!addMoney) return;
    setSavedMoney(savedMoney + Number(addMoney));
    setAddMoney("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🏆 Rewards & Progress</h1>

      <div style={card}>
        <h2>🥤 1. Weekly Reward</h2>

        <input
          value={weeklyReward}
          onChange={(e) => setWeeklyReward(e.target.value)}
          style={input}
        />

        <h2>
          {Math.min(points, weeklyTarget)} / {weeklyTarget} Points
        </h2>

        <progress
          value={Math.min(points, weeklyTarget)}
          max={weeklyTarget}
          style={progress}
        />

        <h2>{weeklyUnlocked ? "🎉 Reward Unlocked!" : "🔒 Locked"}</h2>

        <p>
          {weeklyUnlocked
            ? `You earned your reward: ${weeklyReward}`
            : "Complete more tasks to unlock your weekly reward."}
        </p>
      </div>

      <div style={card}>
        <h2>🎁 2. Main Reward</h2>

        <input
          value={mainReward}
          onChange={(e) => setMainReward(e.target.value)}
          style={input}
        />

        <p>This is your big reward you are working toward.</p>
      </div>

      <div style={card}>
        <h2>💰 3. Money Saving Tracker</h2>

        <input
          type="number"
          value={savingGoal}
          onChange={(e) => setSavingGoal(Number(e.target.value))}
          placeholder="Saving Goal"
          style={input}
        />

        <h2>
          ₹{moneyProgress} / ₹{savingGoal}
        </h2>

        <progress
          value={moneyProgress}
          max={savingGoal}
          style={progress}
        />

        <div style={{ marginTop: "15px" }}>
          <input
            type="number"
            value={addMoney}
            onChange={(e) => setAddMoney(e.target.value)}
            placeholder="Add saved money"
            style={input}
          />

          <button onClick={addSavedMoney} style={button}>
            Add Money
          </button>
        </div>
      </div>

      <div style={card}>
        <h2>📈 4. Work Progress</h2>

        <p>✅ Completed Tasks: {completedTasks}</p>
        <p>🏆 Current Points: {points}</p>
        <p>💰 Money Saved: ₹{savedMoney}</p>
        <p>🥤 Weekly Reward: {weeklyReward}</p>
        <p>🎁 Main Reward: {mainReward}</p>
      </div>
    </div>
  );
}

const card = {
  background: "#1a1a1a",
  padding: "25px",
  borderRadius: "12px",
  marginBottom: "20px",
  textAlign: "center",
};

const input = {
  padding: "10px",
  width: "80%",
  marginTop: "10px",
};

const button = {
  padding: "10px 20px",
  marginLeft: "10px",
  cursor: "pointer",
};

const progress = {
  width: "80%",
  height: "25px",
};

export default Rewards;
import { useState, useEffect } from "react";

function Goals() {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("goalsV2");

    return saved
      ? JSON.parse(saved)
      : {
          daily: ["Complete daily tasks"],
          weekly: ["Reach 500 points"],
          skills: ["Practice editing"],
        };
  });

  const [newGoal, setNewGoal] = useState("");
  const [category, setCategory] = useState("daily");

  useEffect(() => {
    localStorage.setItem("goalsV2", JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (!newGoal.trim()) return;

    setGoals({
      ...goals,
      [category]: [...goals[category], newGoal],
    });

    setNewGoal("");
  };

  const deleteGoal = (categoryName, index) => {
    setGoals({
      ...goals,
      [categoryName]: goals[categoryName].filter((_, i) => i !== index),
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚀 Goals</h1>

      <div style={card}>
        <input
          placeholder="Enter goal..."
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          style={input}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={input}
        >
          <option value="daily">Daily Goal</option>
          <option value="weekly">Weekly Goal</option>
          <option value="skills">Skill Goal</option>
        </select>

        <button onClick={addGoal} style={button}>
          Add Goal
        </button>
      </div>

      <GoalSection title="📅 Daily Goals" items={goals.daily} type="daily" onDelete={deleteGoal} />
      <GoalSection title="📆 Weekly Goals" items={goals.weekly} type="weekly" onDelete={deleteGoal} />
      <GoalSection title="🛠 Skill Goals" items={goals.skills} type="skills" onDelete={deleteGoal} />
    </div>
  );
}

function GoalSection({ title, items, type, onDelete }) {
  return (
    <div style={card}>
      <h2>{title}</h2>

      {items.map((goal, index) => (
        <div key={index} style={goalBox}>
          <span>{goal}</span>

          <button onClick={() => onDelete(type, index)} style={smallButton}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

const card = {
  background: "#1a1a1a",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
};

const goalBox = {
  background: "#222",
  padding: "12px",
  borderRadius: "8px",
  marginBottom: "10px",
  display: "flex",
  justifyContent: "space-between",
};

const input = {
  padding: "10px",
  marginRight: "10px",
};

const button = {
  padding: "10px 20px",
  cursor: "pointer",
};

const smallButton = {
  padding: "6px 12px",
  cursor: "pointer",
};

export default Goals;
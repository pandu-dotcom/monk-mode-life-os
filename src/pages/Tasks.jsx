import { useState, useEffect } from "react";

function Tasks() {
  const today = new Date().toDateString();

  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [
      { name: "Exercise", points: 10, done: false },
      { name: "Prayer", points: 10, done: false },
      { name: "Skill Building", points: 20, done: false },
    ];

    const lastDate = localStorage.getItem("lastTaskDate");

    if (lastDate !== today) {
      localStorage.setItem("lastTaskDate", today);
      return savedTasks.map((task) => ({ ...task, done: false }));
    }

    return savedTasks;
  });

  const [taskName, setTaskName] = useState("");
  const [taskPoints, setTaskPoints] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskName.trim()) return;

    setTasks([
      ...tasks,
      {
        name: taskName,
        points: Number(taskPoints) || 0,
        done: false,
      },
    ]);

    setTaskName("");
    setTaskPoints("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleDone = (index) => {
  const updated = [...tasks];
  updated[index].done = !updated[index].done;

  setTasks(updated);

  const allCompleted =
    updated.length > 0 &&
    updated.every((task) => task.done);

  if (allCompleted) {
    const today = new Date().toDateString();

    const lastStreakDate =
      localStorage.getItem("lastStreakDate");

    if (lastStreakDate !== today) {
      let streak =
        Number(localStorage.getItem("streak")) || 0;

      let bestStreak =
        Number(localStorage.getItem("bestStreak")) || 0;

      streak++;

      if (streak > bestStreak) {
        bestStreak = streak;
        localStorage.setItem(
          "bestStreak",
          bestStreak
        );
      }

      localStorage.setItem("streak", streak);
      localStorage.setItem(
        "lastStreakDate",
        today
      );
    }
  }
};

  const totalScore = tasks
    .filter((task) => task.done)
    .reduce((sum, task) => sum + task.points, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>✅ Daily Tasks</h1>
      <h2>🏆 Daily Score: {totalScore}</h2>

      <input
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />

      <input
        placeholder="Points"
        value={taskPoints}
        onChange={(e) => setTaskPoints(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      <button onClick={addTask} style={{ marginLeft: "10px" }}>
        Add Task
      </button>

      {tasks.map((task, index) => (
        <div
          key={index}
          style={{
            background: "#222",
            padding: "15px",
            marginTop: "10px",
            borderRadius: "10px",
          }}
        >
          <h3>{task.name}</h3>
          <p>Points: {task.points}</p>
          <p>{task.done ? "✅ Done" : "❌ Not Done"}</p>

          <button onClick={() => toggleDone(index)}>Toggle Done</button>

          <button
            onClick={() => deleteTask(index)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
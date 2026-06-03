function Stats() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const focusHours = Number(localStorage.getItem("focusHours")) || 0;
  const streak = Number(localStorage.getItem("streak")) || 0;
  const savedMoney = Number(localStorage.getItem("savedMoney")) || 0;
  const history = JSON.parse(localStorage.getItem("nightReviewHistory")) || {};

  const totalPoints = tasks
    .filter((task) => task.done)
    .reduce((sum, task) => sum + task.points, 0);

  const completedTasks = tasks.filter((task) => task.done).length;
  const reviewDays = Object.keys(history).length;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#d4af37" }}>
        📊 MonkOS Statistics
      </h1>

      <div style={card}><h2>🏆 XP</h2><h1>{totalPoints}</h1></div>
      <div style={card}><h2>✅ Completed Tasks</h2><h1>{completedTasks}</h1></div>
      <div style={card}><h2>🎯 Focus Hours</h2><h1>{focusHours.toFixed(1)}</h1></div>
      <div style={card}><h2>🔥 Streak</h2><h1>{streak} Days</h1></div>
      <div style={card}><h2>💰 Money Saved</h2><h1>₹{savedMoney}</h1></div>
      <div style={card}><h2>🌙 Reviews Saved</h2><h1>{reviewDays}</h1></div>
    </div>
  );
}

const card = {
  background: "#161616",
  border: "1px solid #2a2a2a",
  padding: "20px",
  borderRadius: "16px",
  marginBottom: "20px",
};

export default Stats;
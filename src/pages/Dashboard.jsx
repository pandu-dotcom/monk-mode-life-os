function Dashboard() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const focusHours = Number(localStorage.getItem("focusHours")) || 0;
  const streak = Number(localStorage.getItem("streak")) || 0;
  const bestStreak = Number(localStorage.getItem("bestStreak")) || 0;
  const savedMoney = Number(localStorage.getItem("savedMoney")) || 0;

  const xp = tasks
    .filter((task) => task.done)
    .reduce((sum, task) => sum + task.points, 0);

  const completedTasks = tasks.filter(
    (task) => task.done
  ).length;

  let rank = "Boy";
  let nextRank = "Disciplined";
  let nextTarget = 100;

  if (xp >= 2500) {
    rank = "Elite Monk";
    nextRank = "MAX";
    nextTarget = 2500;
  } else if (xp >= 1000) {
    rank = "Monk";
    nextRank = "Elite Monk";
    nextTarget = 2500;
  } else if (xp >= 500) {
    rank = "Warrior";
    nextRank = "Monk";
    nextTarget = 1000;
  } else if (xp >= 100) {
    rank = "Disciplined";
    nextRank = "Warrior";
    nextTarget = 500;
  }

  const rewardTarget = 500;
  const achievementTarget = 15;

  const unlockedAchievements = [
    xp >= 100,
    xp >= 500,
    xp >= 1000,
    focusHours >= 10,
    focusHours >= 50,
    streak >= 3,
    streak >= 7,
    streak >= 30,
    savedMoney >= 1000,
    savedMoney >= 5000,
  ].filter(Boolean).length;

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {/* Welcome Banner */}

      <div
        style={{
          background: "#161616",
          border: "1px solid #2a2a2a",
          borderRadius: "18px",
          padding: "25px",
          marginBottom: "25px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#d4af37" }}>
          🧘 Welcome Back to MonkOS
        </h1>

        <h2>Current Rank: {rank}</h2>

        <h3>🔥 Current Streak: {streak} Days</h3>

        <p>
          Today's Goal: Protect the streak and
          move closer to your next rank.
        </p>
      </div>

      {/* Elite Monk Banner */}

      {rank === "Elite Monk" && (
        <div
          style={{
            background:
              "linear-gradient(135deg,#d4af37,#8b6f19)",
            color: "#111",
            padding: "25px",
            borderRadius: "18px",
            textAlign: "center",
            marginBottom: "25px",
            fontWeight: "bold",
          }}
        >
          👑 ELITE MONK ACHIEVED

          <p>
            You have reached the highest rank in
            MonkOS.
          </p>
        </div>
      )}

      {/* Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        <Card title="⭐ XP" value={xp} />
        <Card title="🎖 Rank" value={rank} />
        <Card title="🔥 Streak" value={`${streak} Days`} />
        <Card
          title="🏆 Best Streak"
          value={`${bestStreak} Days`}
        />
        <Card
          title="🎯 Focus Hours"
          value={focusHours.toFixed(1)}
        />
        <Card
          title="✅ Tasks Done"
          value={`${completedTasks}/${tasks.length}`}
        />
      </div>

      {/* XP Progress */}

      <div style={box}>
        <h2 style={gold}>⭐ XP Progress</h2>

        <h3>
          {xp} / {nextTarget}
        </h3>

        <progress
          value={Math.min(xp, nextTarget)}
          max={nextTarget}
        />

        <p>
          Next Rank: <strong>{nextRank}</strong>
        </p>
      </div>

      {/* Reward Progress */}

      <div style={box}>
        <h2 style={gold}>🥤 Reward Progress</h2>

        <h3>
          {Math.min(xp, rewardTarget)} /
          {rewardTarget}
        </h3>

        <progress
          value={Math.min(xp, rewardTarget)}
          max={rewardTarget}
        />

        <p>
          {xp >= rewardTarget
            ? "🎉 Reward Unlocked!"
            : "Keep grinding."}
        </p>
      </div>

      {/* Achievement Progress */}

      <div style={box}>
        <h2 style={gold}>🏅 Achievement Progress</h2>

        <h3>
          {unlockedAchievements} /{" "}
          {achievementTarget}
        </h3>

        <progress
          value={unlockedAchievements}
          max={achievementTarget}
        />
      </div>

      {/* Mission */}

      <div style={box}>
        <h2 style={gold}>🎯 Today's Mission</h2>

        <ul>
          <li>Complete Daily Tasks</li>
          <li>Do One Focus Session</li>
          <li>Improve One Skill</li>
          <li>Protect Your Streak</li>
          <li>Move Toward Your Main Reward</li>
        </ul>
      </div>

      {/* Footer */}

      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          opacity: 0.7,
        }}
      >
        <h3>🧘 MonkOS V1</h3>

        <p>
          Built for Discipline. Built for Growth.
        </p>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "#161616",
        border: "1px solid #2a2a2a",
        borderRadius: "18px",
        padding: "25px",
        textAlign: "center",
      }}
    >
      <h3
        style={{
          color: "#d4af37",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>

      <h1>{value}</h1>
    </div>
  );
}

const gold = {
  color: "#d4af37",
};

const box = {
  background: "#161616",
  border: "1px solid #2a2a2a",
  borderRadius: "18px",
  padding: "25px",
  marginTop: "25px",
};

export default Dashboard;
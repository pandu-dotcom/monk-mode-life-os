import { useState, useEffect } from "react";

function FocusMode() {
  const [seconds, setSeconds] = useState(1500);
  const [running, setRunning] = useState(false);
  const [customMinutes, setCustomMinutes] = useState("");

  const [focusHours, setFocusHours] = useState(() => {
    return Number(localStorage.getItem("focusHours")) || 0;
  });

  useEffect(() => {
    let timer;

    if (running && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [running, seconds]);

  useEffect(() => {
    localStorage.setItem("focusHours", focusHours);
  }, [focusHours]);

  useEffect(() => {
    if (seconds === 0 && running) {
      setRunning(false);

      const completedHours = 1500 / 3600;
      setFocusHours((prev) => prev + completedHours);

      alert("🎉 Focus Session Complete!");
    }
  }, [seconds, running]);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#d4af37",
          marginBottom: "20px",
        }}
      >
        🎯 Monk Focus Mode
      </h1>

      <div
        style={{
          background: "#161616",
          border: "1px solid #2a2a2a",
          borderRadius: "18px",
          padding: "30px",
          textAlign: "center",
        }}
      >
        <h2>⏱ Focus Timer</h2>

        <h1
          style={{
            fontSize: "4rem",
            color: "#d4af37",
            margin: "20px 0",
          }}
        >
          {formatTime()}
        </h1>

        <h3>
          🎯 Total Focus Hours: {focusHours.toFixed(1)}
        </h3>

        <div
          style={{
            marginTop: "25px",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button onClick={() => setSeconds(1500)}>
            25 Min
          </button>

          <button onClick={() => setSeconds(3000)}>
            50 Min
          </button>

          <button onClick={() => setSeconds(5400)}>
            90 Min
          </button>
        </div>

        <div
          style={{
            marginTop: "20px",
          }}
        >
          <input
            type="number"
            placeholder="Custom Minutes"
            value={customMinutes}
            onChange={(e) =>
              setCustomMinutes(e.target.value)
            }
            style={{
              width: "200px",
              textAlign: "center",
            }}
          />

          <button
            style={{
              marginLeft: "10px",
            }}
            onClick={() => {
              if (!customMinutes) return;
              setSeconds(Number(customMinutes) * 60);
            }}
          >
            Set Timer
          </button>
        </div>

        <div
          style={{
            marginTop: "25px",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button onClick={() => setRunning(true)}>
            ▶ Start
          </button>

          <button onClick={() => setRunning(false)}>
            ⏸ Pause
          </button>

          <button
            onClick={() => {
              setRunning(false);
              setSeconds(1500);
            }}
          >
            🔄 Reset
          </button>
        </div>
      </div>

      <div
        style={{
          background: "#161616",
          border: "1px solid #2a2a2a",
          borderRadius: "18px",
          padding: "25px",
          marginTop: "25px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#d4af37" }}>
          🧘 Monk Rule
        </h2>

        <p>
          No distractions.
          No scrolling.
          No excuses.
        </p>

        <p>
          Focus completely on the mission until the
          timer ends.
        </p>
      </div>

      <div
        style={{
          background: "#161616",
          border: "1px solid #2a2a2a",
          borderRadius: "18px",
          padding: "25px",
          marginTop: "25px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#d4af37" }}>
          ⚔ Daily Focus Challenge
        </h2>

        <p>25 Min = Beginner</p>
        <p>50 Min = Disciplined</p>
        <p>90 Min = Warrior</p>
        <p>180+ Min = Monk</p>
      </div>
    </div>
  );
}

export default FocusMode;
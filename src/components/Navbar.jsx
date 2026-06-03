import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#111",
        border: "1px solid #2a2a2a",
        borderRadius: "18px",
        padding: "20px",
        marginBottom: "25px",
        boxShadow: "0 0 15px rgba(0,0,0,0.4)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#d4af37",
          marginBottom: "15px",
        }}
      >
        🧘 MonkOS
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <Link to="/">🏠 Dashboard</Link>
        <Link to="/tasks">✅ Tasks</Link>
        <Link to="/focus">🎯 Focus</Link>
        <Link to="/goals">🚀 Goals</Link>
        <Link to="/rewards">🏆 Rewards</Link>
        <Link to="/stats">📊 Stats</Link>
        <Link to="/settings">🌙 Review</Link>
        <Link to="/cloud">☁️ Cloud</Link>
        <Link to="/login">🔐 Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
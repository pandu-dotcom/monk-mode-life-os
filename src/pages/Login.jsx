import { useState } from "react";
import { supabase } from "../supabase";

function Login() {
  const [email, setEmail] = useState("");

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for the login link.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔐 Login to MonkOS</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={signIn}
        style={{
          marginLeft: "10px",
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
import { useState } from "react";
import { saveCloudData, loadCloudData } from "../cloudSync";

function CloudTest() {
  const [email, setEmail] = useState("");

  const saveData = async () => {
    try {
      await saveCloudData(email);
      alert("✅ Data saved to cloud");
    } catch (err) {
      console.error(err);
      alert("❌ Save failed");
    }
  };

  const loadData = async () => {
    try {
      await loadCloudData(email);
      alert("✅ Data loaded from cloud");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("❌ Load failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>☁️ Cloud Sync Test</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div style={{ marginTop: "20px" }}>
        <button onClick={saveData}>
          Save To Cloud
        </button>

        <button
          onClick={loadData}
          style={{ marginLeft: "10px" }}
        >
          Load From Cloud
        </button>
      </div>
    </div>
  );
}

export default CloudTest;
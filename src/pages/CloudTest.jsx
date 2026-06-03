import { useState } from "react";
import { saveCloudData, loadCloudData } from "../cloudSync";

function CloudTest() {
  const [email, setEmail] = useState("");

  const cleanEmail = email.trim().toLowerCase();

  const saveData = async () => {
    try {
      await saveCloudData(cleanEmail);
      alert("✅ Data saved to cloud");
    } catch (err) {
      console.error(err);
      alert("❌ Save failed: " + err.message);
    }
  };

  const loadData = async () => {
    try {
      await loadCloudData(cleanEmail);
      alert("✅ Data loaded from cloud");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("❌ Load failed: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>☁️ Cloud Sync</h1>

      <input
        type="email"
        placeholder="Enter same email on phone and laptop"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div style={{ marginTop: "20px" }}>
        <button onClick={saveData}>Save To Cloud</button>

        <button onClick={loadData} style={{ marginLeft: "10px" }}>
          Load From Cloud
        </button>
      </div>
    </div>
  );
}

export default CloudTest;

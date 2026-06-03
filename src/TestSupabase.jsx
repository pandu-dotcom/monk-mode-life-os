import { useEffect } from "react";
import { supabase } from "../supabase";

function TestSupabase() {
  useEffect(() => {
    async function test() {
      const { data, error } = await supabase
        .from("monkos_users")
        .select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);
    }

    test();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Supabase Test Page</h1>
      <p>Open browser console (F12).</p>
    </div>
  );
}

export default TestSupabase;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import FocusMode from "./pages/FocusMode";
import Goals from "./pages/Goals";
import Rewards from "./pages/Rewards";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import CloudTest from "./pages/CloudTest";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/focus" element={<FocusMode />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/cloud" element={<CloudTest />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
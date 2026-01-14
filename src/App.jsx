import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home.jsx";
import Login from "./pages/Login.jsx";
import GuruDashboard from "./pages/dashboard/GuruDashboard.jsx";
import MuridDashboard from "./pages/dashboard/MuridDashboard.jsx";
import AdminDashboard from "./pages/dashboard/AdminDashboard.jsx";
import SeedPage from "./pages/SeedPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/seed" element={<SeedPage />} /> {/* TAMBAH INI */}
        <Route path="/dashboard/guru" element={<GuruDashboard />} />
        <Route path="/dashboard/murid" element={<MuridDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
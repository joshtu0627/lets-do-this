import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./components/pages/HomePage";
import Loginpage from "./components/pages/LoginPage";
import PartnerList from "./components/pages/PartnerList";
import ProfilePage from "./components/pages/ProfilePage";
import Registerpage from "./components/pages/RegisterPage";
import JobList from "./components/pages/JobList";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/partners" element={<PartnerList />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

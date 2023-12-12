import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./components/pages/HomePage";
import Loginpage from "./components/pages/LoginPage";
import PartnerList from "./components/pages/PartnerList";
import ProfilePage from "./components/pages/ProfilePage";
import ProjectDetail from "./components/pages/ProjectDetail";
import Registerpage from "./components/pages/RegisterPage";
import JobList from "./components/pages/JobList";
import SelfProfilePage from "./components/pages/SelfProfilePage";
import MyHomePage from "./components/pages/MyHomePage";
import NotificationPage from "./components/pages/NotificationPage";
import MessagePage from "./components/pages/MessagePage";
import Test from "./components/pages/Test";

import UserAuthInitializer from "./utils/UserAuthInitializer";
import { UserProvider } from "./contexts/UserContext";
import { useUser } from "./contexts/UserContext";

import "./App.css";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <UserAuthInitializer />
        <Routes>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/partners" element={<PartnerList />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/selfProfile" element={<SelfProfilePage />} />
          <Route path="/myHomePage" element={<MyHomePage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/messages" element={<MessagePage />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

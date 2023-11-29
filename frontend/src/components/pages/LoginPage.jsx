import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

import LoginPanel from "../loginpage/LoginPanel";

export default function Loginpage() {
  return (
    <div className="h-screen flex flex-col bg-[#242128]">
      <Header />
      <LoginPanel />
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
}

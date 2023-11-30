import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

import RegisterPanel from "../loginpage/RegisterPanel";

export default function Registerpage() {
  return (
    <div className="h-screen flex flex-col bg-[#242128]">
      <Header />
      <RegisterPanel />
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
}

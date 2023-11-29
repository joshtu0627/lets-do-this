import React from "react";

import logo from "../../../assets/logo.png";

export default function Header() {
  return (
    <header className="flex bg-black h-20 text-white justify-center">
      <div className="w-1/3 flex items-center justify-end px-20">
        <div>Find Partner</div>
      </div>
      <div className="w-1/5 flex items-center justify-center">
        <img className="w-28" src={logo} alt="logo" />
      </div>
      <div className="w-1/3 flex items-center justify-between px-20">
        <div>Find Project</div>
        <div>login / register</div>
      </div>
    </header>
  );
}

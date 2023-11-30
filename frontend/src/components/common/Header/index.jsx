import React from "react";

import { Link } from "react-router-dom";

import logo from "../../../assets/logo.png";

export default function Header() {
  return (
    <header className="flex justify-center h-20 text-white bg-black">
      <div className="flex items-center justify-end w-1/3 px-20">
        <Link to={"/partners"}>
          <div>Find Partner</div>
        </Link>
      </div>
      <div className="flex items-center justify-center w-1/5">
        <Link to={"/"}>
          <img className="w-28" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="flex items-center justify-between w-1/3 px-20">
        <Link to={"/jobs"}>
          <div>Find Project</div>
        </Link>
        <Link to={"/login"}>
          <div>login / register</div>
        </Link>
      </div>
    </header>
  );
}

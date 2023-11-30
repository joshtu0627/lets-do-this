import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import logo from "../../../assets/logo.png";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const storage = window.localStorage;

  useEffect(() => {
    const token = storage.getItem("token");

    // use backend passport to check if user is logged in
    fetch("http://localhost:8000/api/1.0/user/isLoggedIn", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 將 token 放入 Authorization header 中
      },
    })
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message === "success") {
          setUser(data.data);
          setLoggedIn(true);
          console.log("logged in");
        } else {
          setLoggedIn(false);
          console.log("not logged in");
        }
      });
  }, []);
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
        {loggedIn ? (
          <Link to={"/selfProfile"}>
            <div className="flex items-center">
              <div>
                <img
                  className="w-8 h-8 rounded-full"
                  src={user.image}
                  alt="profile"
                />
              </div>
              <div className="ml-3">{user.name}</div>
            </div>
          </Link>
        ) : (
          <Link to={"/login"}>
            <div>login / register</div>
          </Link>
        )}
      </div>
    </header>
  );
}

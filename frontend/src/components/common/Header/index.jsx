import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import logo from "../../../assets/logo.png";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const [nowPage, setNowPage] = useState("home");

  const navigate = useNavigate();
  const storage = window.localStorage;

  useEffect(() => {
    const currentPath = window.location.href;
    console.log(currentPath);

    if (currentPath.includes("partners")) {
      setNowPage("partners");
    } else if (currentPath.includes("jobs")) {
      setNowPage("jobs");
    } else if (currentPath.includes("selfProfile")) {
      setNowPage("selfProfile");
    } else if (currentPath.includes("login")) {
      setNowPage("login");
    } else if (currentPath.includes("register")) {
      setNowPage("register");
    } else if (currentPath.includes("profile")) {
      setNowPage("profile");
    } else if (currentPath.includes("project")) {
      setNowPage("project");
    } else {
      setNowPage("home");
    }

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
          <div
            className={
              "text-l h2 " +
              (nowPage === "partners" ? "border-b-2 border-white" : "")
            }
          >
            Find Partner
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-center w-1/5">
        <Link to={"/"}>
          <img className="w-28" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="flex items-center justify-between w-1/3 px-20">
        <Link to={"/jobs"}>
          <div
            className={
              "text-l h2 " +
              (nowPage === "jobs" ? "border-b-2 border-white" : "")
            }
          >
            Find Project
          </div>
        </Link>
        {loggedIn ? (
          <>
            <div className="flex">
              <Link to={"/selfProfile"}>
                <div className="flex items-center mx-3">
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
              <Button
                variant="outlined"
                color="primary"
                size="small"
                style={{
                  border: "None",
                  fontSize: "0.8rem",
                }}
                onClick={() => {
                  storage.removeItem("token");
                  setLoggedIn(false);
                  navigate("/");
                }}
              >
                Logout
              </Button>
            </div>
          </>
        ) : (
          <Link to={"/login"}>
            <div className="text-l h2">Login / Register</div>
          </Link>
        )}
      </div>
    </header>
  );
}

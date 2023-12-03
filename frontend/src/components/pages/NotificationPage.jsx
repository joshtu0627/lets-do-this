import React, { useState, useEffect } from "react";

import { useParams, useNavigate, Navigate } from "react-router-dom";

import Header from "../common/Header";
import Footer from "../common/Footer";

import { Button } from "@mui/material";

export default function MyHomePage() {
  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]);
  const storage = window.localStorage;

  const navigate = useNavigate();
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
          console.log("logged in");
        } else {
          console.log("not logged in");
          navigate("/login");
        }
      });
  }, []);

  useEffect(() => {
    console.log(user);
    if (!user.id) return;
    function fetchUserNotifications() {
      fetch(`http://127.0.0.1:8000/api/1.0/user/1/notifications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          console.log(resp);
          return resp.json();
        })
        .then((data) => {
          //   console.log(data);
          setNotifications(data);
        });
    }
    fetchUserNotifications();
  }, [user]);

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  return (
    <div className="min-h-screen flex flex-col bg-[#1A171D]">
      <Header />
      <div className="flex justify-center text-white">
        <div className="flex w-5/6 m-10">
          <div className="w-full">
            <div className="bg-[#2c2830] h-16 flex items-center px-5">
              <div className="h2">Notifications</div>
            </div>
            {notifications &&
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="bg-[#2c2830] mt-5 h-28 flex justify-between items-center px-5"
                >
                  <div className="flex items-center">
                    <img
                      className="w-16 h-16 rounded-full"
                      src={notification.project.image}
                      alt="project"
                    />
                    <div className="ml-5 h2">{notification.project.name}</div>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      className="w-4 h-8"
                      style={{ fontFamily: "Domine" }}
                    >
                      view
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
}

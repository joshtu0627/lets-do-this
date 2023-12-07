import React, { useState, useEffect } from "react";

import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

import Header from "../common/Header";
import Footer from "../common/Footer";
import NotificationDetail from "../notificationPage/notificationDetail/index";

import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function NotificationPage() {
  const { user, login, logout } = useUser();
  const [notifications, setNotifications] = useState([]);
  const storage = window.localStorage;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        ...options,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Fetch error: ", error);
      return null;
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    fetchData(`http://127.0.0.1:8000/api/1.0/user/${user.id}/notifications`)
      .then((data) => setNotifications(data))
      .catch((error) => console.error("Error fetching notifications:", error));
  }, [user, refetch]);

  // fetchData 函數，可以從之前的示例中獲得

  return (
    <div className="min-h-screen flex flex-col bg-[#1A171D]">
      <Header />
      <div className="flex justify-center text-white">
        <div className="flex w-5/6 m-10">
          <div className="w-full">
            <div className="bg-[#2c2830] h-16 flex items-center px-5">
              <div className="h2">Notifications</div>
            </div>
            {notifications && notifications.length === 0 && (
              <div className=" mt-5 h-28 flex justify-between items-center px-5">
                <div className="h2">No notifications</div>
              </div>
            )}
            {notifications &&
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="bg-[#2c2830] mt-5 h-28 flex justify-between items-center px-5"
                >
                  <div className="flex items-center tracking-wide">
                    <Link to={`/project/${notification.project.id}`}>
                      <img
                        className="w-16 h-16 rounded-full"
                        src={notification.project.image}
                        alt="project"
                      />
                    </Link>
                    <Link to={`/project/${notification.project.id}`}>
                      <div className="px-5 text-xl font-bold border-r h2">
                        {notification.project.name}
                      </div>
                    </Link>
                    <div className="px-5 text-xl border-r h2">
                      {notification.type}
                    </div>
                    <div className="px-5 text-xl border-r h2">
                      {notification.role}
                    </div>
                    <div className="ml-5 text-xl h2">
                      {notification.timeDiff}
                    </div>
                  </div>
                  <div>{notification.text}</div>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      className="w-4 h-8"
                      style={{ fontFamily: "Domine" }}
                      onClick={handleOpen}
                    >
                      view
                    </Button>
                    <div>
                      <NotificationDetail
                        open={open}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                        notification={notification}
                        user={user}
                        setRefetch={setRefetch}
                      />
                    </div>
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

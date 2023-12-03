import React from "react";

import { Link } from "react-router-dom";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

export default function NotificationDetail({
  open,
  handleOpen,
  handleClose,
  notification,
  user,
}) {
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
  function joinUserToProject() {
    const url = `http://127.0.0.1:8000/api/1.0/user/joinProject`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        projectId: notification.project.id,
        role: notification.role,
      }),
    };
    fetchData(url, options)
      .then((data) => {
        console.log(data);
        handleClose();
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="flex">
          <div className="flex justify-between w-full">
            <div className="flex items-center w-1/3">
              <div className="w-12 h-12 mr-5">
                <Link to={`/project/${notification.project.id}`}>
                  <img
                    src={notification.project.image}
                    className="w-12 h-12 rounded-full"
                    alt=""
                  />
                </Link>
              </div>{" "}
              <Link to={`/project/${notification.project.id}`}>
                {notification.project.name}
              </Link>
            </div>

            <div className="flex justify-center w-1/3">
              <div className="font-bold">{notification.type}</div>
            </div>

            <div className="flex justify-center w-1/3">
              <div>{notification.timeDiff}</div>
            </div>
          </div>
        </DialogTitle>
        <div className="flex justify-center">
          <div className="text-xl">Role: {notification.role}</div>
        </div>
        <DialogContent className="mt-10">
          <div>{notification.text}</div>
          <div className="flex mt-10">
            <Button
              variant="contained"
              color="primary"
              onClick={joinUserToProject}
            >
              Join the project
            </Button>
            <div className="mx-5"></div>
            <Button variant="contained" color="primary">
              Decline
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

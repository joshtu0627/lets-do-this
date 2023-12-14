import React, { useState } from "react";

import { Link } from "react-router-dom";

import JoinProjectDialog from "../../dialog/JoinProjectDialog";

import { deleteNotification } from "../../../utils/Apis";

import { backendurl } from "../../../constants/urls";

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
  setRefetch,
}) {
  const bu = backendurl;
  const [openJoinProjectDialog, setOpenJoinProjectDialog] = useState(false);
  const handleOpenJoinProjectDialog = () => {
    setOpenJoinProjectDialog(true);
  };

  const handleCloseJoinProjectDialog = () => {
    setOpenJoinProjectDialog(false);
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
  function joinUserToProject() {
    const url = `http://${bu}/user/joinProject`;
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
      .then(async (data) => {
        console.log(data);
        handleClose();
        setOpenJoinProjectDialog(true);
        await deleteNotification(notification.id);
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
              <div className="flex items-center font-bold">
                {notification.type}
              </div>
            </div>

            <div className="flex items-center justify-center w-1/3 font-bold">
              <div>{notification.timeDiff}</div>
            </div>
          </div>
        </DialogTitle>
        <div className="flex justify-center py-2 mx-8 border-b-2 ">
          <div className="text-xl">Role: {notification.role}</div>
        </div>
        <DialogContent className="flex flex-col items-center justify-center mt-4">
          <div className="w-3/5">{notification.text}</div>
          <div className="flex mt-10">
            <Button
              variant="contained"
              color="primary"
              onClick={joinUserToProject}
            >
              Join it!
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
      <JoinProjectDialog
        open={openJoinProjectDialog}
        handleClose={handleCloseJoinProjectDialog}
        projectName={notification.project.name}
        setRefetch={setRefetch}
      />
    </div>
  );
}

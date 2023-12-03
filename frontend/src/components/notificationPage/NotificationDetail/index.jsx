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
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="flex items-center justify-between">
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
        </DialogTitle>
        <DialogContent className="mt-10">
          <div>{notification.text}</div>
          <div className="flex mt-10">
            <Button variant="contained" color="primary">
              Join the project
            </Button>
            <div className="mx-5"></div>
            <Button variant="contained" color="primary">
              Decline
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>關閉</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

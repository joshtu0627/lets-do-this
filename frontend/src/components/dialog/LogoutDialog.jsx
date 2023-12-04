import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

function LogoutDialog({ open, handleClose }) {
  const { user, login, logout } = useUser();

  const navigate = useNavigate();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You have been logged out.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            navigate("/");
            handleClose();
            logout();
          }}
          autoFocus
        >
          Back to Home
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LogoutDialog;

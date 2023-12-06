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

function BasicDialog({ open, handleClose, title, content, handleParentClose }) {
  const { user, login, logout } = useUser();

  const navigate = useNavigate();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {handleParentClose ? (
          <Button
            onClick={() => {
              handleClose();
              handleParentClose();
            }}
            autoFocus
          >
            ok
          </Button>
        ) : (
          <Button
            onClick={() => {
              handleClose();
            }}
            autoFocus
          >
            ok
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default BasicDialog;

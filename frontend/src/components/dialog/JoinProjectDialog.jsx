import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

function JoinProjectDialog({ open, handleClose, projectName }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Congratulations!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You have been joined the project {projectName}.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
          }}
          autoFocus
        >
          Back to notification
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default JoinProjectDialog;

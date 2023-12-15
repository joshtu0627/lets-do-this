import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Select,
  TextField,
} from "@mui/material";
export default function ApplyDialog({ open, handleClose, job }) {
  const [message, setMessage] = useState("");
  // function sendApplication() {

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle id="alert-dialog-title">
        <div className="flex justify-center py-6 mx-4 border-b-2">
          <div className="text-3xl h2">
            Request to Join Project :<span className=""> {job.name}</span>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="my-4 text-2xl h2">
          Tell the team about you, and why you want to join them!
        </div>
        <div>
          <TextField
            multiline
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ width: "100%" }}
          ></TextField>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
          }}
          autoFocus
        >
          send
        </Button>
      </DialogActions>
    </Dialog>
  );
}

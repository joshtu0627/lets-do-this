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

export default function WorkDialog({ open, handleClose, work }) {
  const { user, login, logout } = useUser();

  const navigate = useNavigate();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullWidth
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div className="flex flex-col justify-center py-6 mx-4">
            <div className="w-full border-b-2">
              <img src={work.image} alt="" />
            </div>
            <div className="mt-5 text-3xl h2">{work.name}</div>
            <div className="text-xl h2">{work.about}</div>
            {work.tools && (
              <div className="mt-5 text-lg h2">
                <span className="mr-1 font-bold">Tools: </span>
                {work.tools.map((tool) => (
                  <span className="px-2 py-1 mr-2 border-2 border-gray-500 rounded-md">
                    {tool}
                  </span>
                ))}
              </div>
            )}
            {work.tags && (
              <div className="mt-5 text-lg h2">
                <span className="mr-1 font-bold">Tags: </span>
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 mr-2 border-2 border-gray-500 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

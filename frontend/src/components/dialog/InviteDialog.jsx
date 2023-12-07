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
} from "@mui/material";
import { Input, TextField } from "@mui/material";

import { jobList } from "../../data/data";

export default function InviteDialog({
  open,
  handleClose,
  invitedUser,
  projects,
}) {
  const [invitedToProject, setInvitedToProject] = useState();
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  function handleInvitaion

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle id="alert-dialog-title">
          <div className="flex justify-center py-6 mx-4 border-b-2">
            <div className="text-3xl h2">
              Project invitation for <span className="">{invitedUser.name}</span>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex justify-center">
            <div className="flex flex-col w-4/5">
              <div className="flex w-full">
                {" "}
                <div className="w-1/2 mr-8">
                  <div className="my-5">
                    <div className="text-2xl h2">Invite to</div>
                    <div className="mt-5">
                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // onChange={handleChange}
                        >
                          {projects &&
                            projects.map((project) => (
                              <MenuItem
                                key={project.id}
                                value={project.id}
                                onClick={() => {
                                  setInvitedToProject(project.id);
                                }}
                              >
                                {project.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="my-5">
                    <div className="text-2xl h2">The role</div>
                    <div className="mt-5">
                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // onChange={handleChange}
                        >
                          {jobList &&
                            jobList.map((job) => (
                              <MenuItem
                                key={job}
                                value={job}
                                onClick={() => {
                                  setRole(job);
                                }}
                              >
                                {job}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <div className="text-2xl h2">Message</div>
                <div className="my-1">
                  <TextField
                    multiline
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    sx={{ width: "100%" }}
                  ></TextField>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}

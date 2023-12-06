import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Input, TextField } from "@mui/material";

export default function InviteDialog({
  open,
  handleClose,
  invitedUser,
  projects,
}) {
  const [invitedToProject, setInvitedToProject] = useState();

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle id="alert-dialog-title">
          <div className="flex justify-center py-6 mx-4 border-b-2">
            <div className="text-3xl h2">
              Project invitation for {invitedUser.name}
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex justify-center">
            <div className="flex w-4/5">
              <div className="w-1/2">
                <div className="my-5">
                  <div className="text-2xl h2">Invite to</div>
                  <div>
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    ></Input>
                  </div>
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

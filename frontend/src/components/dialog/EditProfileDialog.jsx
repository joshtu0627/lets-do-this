import React, { useState, useEffect, useRef } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Input, TextField } from "@mui/material";
import { CgAdd } from "react-icons/cg";

export default function EditProfileDialog({ open, handleClose, user }) {
  const [name, setName] = useState(user && user.name);
  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState(user && user.location);
  const [about, setAbout] = useState(user && user.about);
  const [image, setImage] = useState(user && user.image);
  const [bannerImage, setBannerImage] = useState(user && user.bannerImage);

  const imageInputRef = useRef(null);
  const bannerImageInputRef = useRef(null);

  const handleUploadImageButtonClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadBannerImageButtonClick = () => {
    bannerImageInputRef.current.click();
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setName(user && user.name);
    // split job
    setJobs(user && user.job);
    setLocation(user && user.location);
    setAbout(user && user.about);
    setImage(user && user.image);
    setBannerImage(user && user.bannerImage);
  }, [user]);

  return (
    <>
      {user && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="md"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">
            <div className="flex justify-center py-6 mx-4 border-b-2">
              <div className="text-3xl h2">
                Tell us about yourself, {user.name}!
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div className="flex my-5 h2">
                <div className="w-1/2 ">
                  <div className="flex flex-col justify-center w-2/3 ml-16">
                    <div className="">
                      <div>Your name</div>
                      <div>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></Input>
                      </div>
                    </div>
                    <div className="my-5">
                      <div>Your job</div>
                      {jobs &&
                        jobs.map((job, index) => (
                          <div key={index}>
                            <Input
                              value={job}
                              onChange={(e) => {
                                let newJob = [...jobs];
                                newJob[index] = e.target.value;
                                setJobs(newJob);
                              }}
                            ></Input>
                          </div>
                        ))}
                      <div
                        className="flex items-center mt-2 cursor-pointer"
                        onClick={() => {
                          if (jobs[jobs.length - 1] === "") return;
                          let newJob = [...jobs];
                          newJob.push("");
                          setJobs(newJob);
                        }}
                      >
                        <CgAdd size={20} className="mr-2" /> Add new
                      </div>
                    </div>
                    <div className="my-5">
                      <div>Your location</div>
                      <div>
                        <Input
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        ></Input>
                      </div>
                    </div>
                    <div className="my-5">
                      <div>One line about you</div>
                      <div className="my-1">
                        <TextField
                          value={about}
                          onChange={(e) => setAbout(e.target.value)}
                          sx={{ width: "100%" }}
                        ></TextField>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-1/2">
                  <div>Avatar</div>
                  <div className="mr-4 border-2 h-1/2">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="my-4">
                        <img
                          className="object-cover rounded-full h-28 w-28"
                          src={image}
                          alt=""
                        />
                      </div>
                      <div className="flex justify-center w-full mb-5">
                        <div className="flex justify-center w-1/2 border-2 cursor-pointer">
                          <div
                            className="text-md"
                            onClick={() => {
                              handleUploadImageButtonClick();
                            }}
                          >
                            + Upload New Avatar
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10">Cover Image</div>
                  <div className="mr-4 border-2 h-1/2">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-4/5 my-6">
                        <img
                          className="object-cover w-full h-full"
                          src={bannerImage}
                          alt=""
                        />
                      </div>
                      <div className="flex justify-center w-full mb-5">
                        <div className="flex justify-center w-1/2 border-2 cursor-pointer">
                          <div
                            className="text-md"
                            onClick={() => {
                              handleUploadBannerImageButtonClick();
                            }}
                          >
                            + Upload New Avatar
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
              }}
              autoFocus
            >
              Save
            </Button>
          </DialogActions>
          <input
            type="file"
            ref={imageInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
            accept="image/*"
          />
          <input
            type="file"
            ref={bannerImageInputRef}
            style={{ display: "none" }}
            onChange={handleBannerImageChange}
            accept="image/*"
          />
        </Dialog>
      )}
    </>
  );
}

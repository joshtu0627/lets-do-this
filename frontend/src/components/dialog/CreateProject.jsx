import React, { useState, useEffect, useRef } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Input, TextField } from "@mui/material";
import { CgAdd } from "react-icons/cg";

import { useUser } from "../../contexts/UserContext";

import UpdateProfileSucessDialog from "./UpdateProfileSucessDialog";

export default function CreateProjectDialog({ open, handleClose }) {
  const { user, login, logout } = useUser();

  const [image, setImage] = useState();
  const [bannerImage, setBannerImage] = useState();

  const [name, setName] = useState("");
  const [tags, setTags] = useState([""]);

  const [about, setAbout] = useState("");
  const [jobs, setJobs] = useState([""]);

  const [progressTags, setProgressTags] = useState([""]);
  const [progressDescription, setProgressDescription] = useState("");

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

  const handleCreateProject = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("about", about);
    formData.append("progress", progressDescription);
    formData.append("tag", JSON.stringify(tags));
    formData.append("hiring", JSON.stringify(jobs));
    formData.append("progressTag", JSON.stringify(progressTags));
    formData.append("image", imageInputRef.current.files[0]);
    formData.append("bannerImage", bannerImageInputRef.current.files[0]);

    // let members = {
    //   [user.id]: "leader",
    // };
    // formData.append("members", JSON.stringify(members));

    let resp = await fetch(
      "http://127.0.0.1:8000/api/1.0/project/createProject",
      {
        method: "POST",
        body: formData,
      }
    );

    let data = await resp.json();

    console.log("user:", user);
    let userId = user.id;

    let payload = {
      userId: userId,
      projectId: data.projectId,
      role: "Leader",
    };

    console.log("aewwwwwwwfawf");
    console.log(payload);

    let resp2 = await fetch(
      "http://127.0.0.1:8000/api/1.0/user/joinUserProjectTable",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    let data2 = await resp2.json();

    console.log("data2", data2);
  };

  return (
    <>
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
            <div className="text-3xl h2">Create a project</div>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="flex flex-col">
              <div className="flex w-full px-8">
                <div className="w-48 w-full my-5">
                  <div className="">Avatar</div>
                  <div className="h-48 mr-4 border-2 w-44 h-44">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="my-4">
                        {image && (
                          <img
                            className="object-cover rounded-full h-28 w-28"
                            src={image}
                            alt=""
                          />
                        )}
                      </div>
                      <div className="flex justify-center w-full mb-5">
                        <div className="flex justify-center w-4/5 py-1 border-2 cursor-pointer">
                          <div
                            className="text-xs"
                            onClick={handleUploadImageButtonClick}
                          >
                            + Upload New Avatar
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full my-5 ml-3">
                  <div>Banner image</div>
                  <div className="w-full h-48 mr-4 border-2 h-44">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="mb-2 h-3/4">
                        {bannerImage && (
                          <img
                            className="object-cover w-full h-full"
                            src={bannerImage}
                            alt=""
                          />
                        )}
                      </div>
                      <div className="flex justify-center w-full ">
                        <div className="flex justify-center w-4/5 py-1 border-2 cursor-pointer">
                          <div
                            className="text-xs"
                            onClick={handleUploadBannerImageButtonClick}
                          >
                            + Upload New Banner
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full mt-5">
                <div className="flex flex-col w-1/2 px-8">
                  <div className="text-3xl h2">Project information</div>
                  <div className="my-5">
                    <div>Project name</div>
                    <div>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></Input>
                    </div>
                  </div>
                  <div className="my-5">
                    <div>Tag</div>
                    <div>
                      {tags &&
                        tags.map((tag, index) => (
                          <div key={index}>
                            <Input
                              value={tag}
                              onChange={(e) => {
                                let newTags = [...tags];
                                newTags[index] = e.target.value;
                                setTags(newTags);
                              }}
                            ></Input>
                          </div>
                        ))}
                      <div
                        className="flex items-center mt-2 cursor-pointer"
                        onClick={() => {
                          if (tags[tags.length - 1] === "") return;
                          let newTags = [...tags];
                          newTags.push("");
                          setTags(newTags);
                        }}
                      >
                        {" "}
                        <CgAdd size={20} className="mr-2" /> Add new
                      </div>
                    </div>
                  </div>
                  <div className="my-5">
                    <div>Description</div>
                    <div className="my-1">
                      <TextField
                        multiline
                        rows={2}
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        sx={{ width: "100%" }}
                      ></TextField>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-1/2 px-8">
                  <div className="text-3xl h2">Project status</div>
                  <div className="my-5">
                    <div>Hiring</div>
                    <div>
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
                        {" "}
                        <CgAdd size={20} className="mr-2" /> Add new
                      </div>
                    </div>
                  </div>

                  <div className="my-5">
                    <div>Progress tags</div>
                    <div>
                      {progressTags &&
                        progressTags.map((tag, index) => (
                          <div key={index}>
                            <Input
                              value={tag}
                              onChange={(e) => {
                                let newTags = [...progressTags];
                                newTags[index] = e.target.value;
                                setProgressTags(newTags);
                              }}
                            ></Input>
                          </div>
                        ))}
                      <div
                        className="flex items-center mt-2 cursor-pointer"
                        onClick={() => {
                          if (progressTags[progressTags.length - 1] === "")
                            return;
                          let newTags = [...progressTags];
                          newTags.push("");
                          setProgressTags(newTags);
                        }}
                      >
                        {" "}
                        <CgAdd size={20} className="mr-2" /> Add new
                      </div>
                    </div>
                  </div>
                  <div className="my-5">
                    <div>Progress description</div>
                    <div className="my-1">
                      <TextField
                        multiline
                        rows={2}
                        value={progressDescription}
                        onChange={(e) => setProgressDescription(e.target.value)}
                        sx={{ width: "100%" }}
                      ></TextField>
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
              handleCreateProject();
              // handleClose();
            }}
            autoFocus
          >
            Create
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
    </>
  );
}

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

import UpdateProfileSucessDialog from "./UpdateProfileSucessDialog";

import { backendurl } from "../../constants/urls";

export default function EditProfileDialog({ open, handleClose, user }) {
  const [name, setName] = useState(user && user.name);
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [location, setLocation] = useState(user && user.location);
  const [about, setAbout] = useState(user && user.about);
  const [image, setImage] = useState(user && user.image);
  const [bannerImage, setBannerImage] = useState(user && user.bannerImage);

  const [userPreference, setUserPreference] = useState({
    contract: false,
    freelance: false,
    remoteWork: false,
  });

  const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
  };

  const imageInputRef = useRef(null);
  const bannerImageInputRef = useRef(null);

  // useEffect(() => {
  //   if (user && user.userPreference && user.userPreference.contract) {
  //     console.log(user.userPreference.contract);
  //   }
  // }, []);

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

  const handleUpdateProfile = async () => {
    // console.log(userPreference);

    // 創建 FormData 物件
    const formData = new FormData();

    // 添加文本字段
    formData.append("name", name);
    formData.append("job", JSON.stringify(jobs)); // 將職業陣列轉成 JSON 字串
    formData.append("location", location);
    formData.append("about", about);
    formData.append("skill", JSON.stringify(skills)); // 將技能陣列轉成 JSON 字串

    formData.append("userPreferences", JSON.stringify(userPreference));

    formData.append("id", 36);

    // 檢查並添加圖片檔案
    if (imageInputRef.current.files[0]) {
      console.log("image ok");
      formData.append("image", imageInputRef.current.files[0]);
    }

    if (bannerImageInputRef.current.files[0]) {
      console.log("banner image ok");
      formData.append("bannerImage", bannerImageInputRef.current.files[0]);
    }
    // console.log(formData.get("image"));

    // 發送請求到伺服器
    try {
      const response = await fetch(`http://${backendurl}/user/updateProfile`, {
        method: "POST", // 或 'PUT'，根據您的 API 設定
        body: formData,
      });

      const result = await response.json();
      // 處理返回結果
      if (result.message === "success") {
        // handleClose();
        setOpenSuccessDialog(true);
      }
      console.log(result);
    } catch (error) {
      // 處理錯誤
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    setName(user && user.name);
    // split job
    setJobs(user && user.job);
    setSkills(user && user.skill);
    setLocation(user && user.location);
    setAbout(user && user.about);
    setImage(user && user.image);
    setBannerImage(user && user.bannerImage);

    setUserPreference(user && user.userPreferences);
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
                      <div>Your skill</div>
                      {skills &&
                        skills.map((skill, index) => (
                          <div key={index}>
                            <Input
                              value={skill}
                              onChange={(e) => {
                                let newSkill = [...skill];
                                newSkill[index] = e.target.value;
                                setSkills(newSkill);
                              }}
                            ></Input>
                          </div>
                        ))}
                      <div
                        className="flex items-center mt-2 cursor-pointer"
                        onClick={() => {
                          if (skills[skills.length - 1] === "") return;
                          let newSkill = [...skills];
                          newSkill.push("");
                          setSkills(newSkill);
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
                      <div>Preference</div>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                userPreference && userPreference.contract
                              }
                              onClick={(e) =>
                                setUserPreference({
                                  ...userPreference,
                                  contract: !userPreference.contract,
                                })
                              }
                              color="primary"
                            />
                          }
                          label="Contract"
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                userPreference && userPreference.freelance
                              }
                              value={userPreference && userPreference.freelance}
                              onChange={(e) =>
                                setUserPreference({
                                  ...userPreference,
                                  freelance: !userPreference.freelance,
                                })
                              }
                              color="primary"
                            />
                          }
                          label="Freelance"
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                userPreference && userPreference.remoteWork
                              }
                              onChange={(e) =>
                                setUserPreference({
                                  ...userPreference,
                                  remoteWork: !userPreference.remoteWork,
                                })
                              }
                              color="primary"
                            />
                          }
                          label="Remotework"
                        />
                      </div>
                    </div>
                    <div className="my-5">
                      <div>One line about you</div>
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
                handleUpdateProfile();
                // handleClose();
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
          <UpdateProfileSucessDialog
            open={openSuccessDialog}
            handleClose={handleCloseSuccessDialog}
          />
        </Dialog>
      )}
    </>
  );
}

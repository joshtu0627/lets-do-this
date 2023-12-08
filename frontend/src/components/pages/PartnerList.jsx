import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../common/Header";
import Footer from "../common/Footer";

import { skillList } from "../../data/data";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/lowerCaseTheme";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";

import { useUser } from "../../contexts/UserContext";
import { getProjectsByUserId } from "../../utils/Apis";

import InviteDialog from "../dialog/InviteDialog";

export default function PartnerList() {
  const { user, login, logout } = useUser();

  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [choosedSkill, setChoosedSkill] = useState("None");
  const [portfolioDetail, setPortfolioDetail] = useState([]);

  const [projects, setProjects] = useState([]);

  const [openInviteDialog, setOpenInviteDialog] = useState(false);

  const [clickedUser, setClickedUser] = useState({});

  const handleOpenInviteDialog = () => {
    setOpenInviteDialog(true);
  };

  const handleCloseInviteDialog = () => {
    setOpenInviteDialog(false);
  };
  const fetchData = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        ...options,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Fetch error: ", error);
      return null;
    }
  };
  const processUserData = (userData) => {
    userData.forEach((user) => {
      user.jobStr = user.job?.join(", ") || "";
      user.skillStr = user.skill?.join(", ") || "";
    });
    return userData;
  };

  async function getPortfolio() {
    let result = await Promise.all(
      data.map(async (user) => {
        if (user.portfolio) {
          const portfolioData = await Promise.all(
            user.portfolio.map((portfolioId) =>
              fetchData(
                `http://localhost:8000/api/1.0/user/work/${portfolioId}`
              )
            )
          );
          return portfolioData.length ? portfolioData : new Array(3).fill({});
        }
        return new Array(3).fill({});
      })
    );
    setPortfolioDetail(result);
  }

  function getAllUser() {
    fetchData("http://localhost:8000/api/1.0/user/all").then((data) => {
      if (!data || data.length === 0) {
        setMessage("No result found");
        return;
      }
      setMessage("");
      setData(processUserData(data));
    });
  }

  function getChoosedSkill() {
    setMessage("searching...");
    setData([]);
    fetchData(
      `http://localhost:8000/api/1.0/user/experties/${choosedSkill.toLowerCase()}`
    ).then((data) => {
      if (!data || data.length === 0) {
        setMessage("No result found");
        return;
      }
      setMessage("");
      setData(processUserData(data));
    });
  }

  useEffect(() => {
    if (choosedSkill === "None") {
      getAllUser();
    } else {
      getChoosedSkill();
    }
  }, [choosedSkill]);

  useEffect(() => {
    if (!user) return;
    console.log(user);
    getProjectsByUserId(user.id).then((data) => {
      if (!data) return;
      setProjects(data);
    });
  }, [user]);

  useEffect(() => {
    getPortfolio();
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen flex flex-col bg-[#1A171D]">
        <Header />
        <div className="flex justify-center text-white">
          <div className="flex w-5/6 m-10">
            <div className="w-1/5 mx-10 border border-gray-400  bg-[#2c2830]">
              <div className="m-5 text-lg">{"Preference"}</div>

              <FormGroup className="m-5">
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "#fff",
                        "&.Mui-checked": { color: "#fff" },
                        "&.Mui-checked:hover": { color: "#fff" },
                        "&.Mui-checked.Mui-disabled": { color: "#fff" },
                        "&.Mui-checked.Mui-disabled:hover": { color: "#fff" },
                        "&.Mui-disabled": { color: "#fff" },
                        "&.Mui-disabled:hover": { color: "#fff" },
                      }}
                    />
                  }
                  label="Contract"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "#fff",
                        "&.Mui-checked": { color: "#fff" },
                        "&.Mui-checked:hover": { color: "#fff" },
                        "&.Mui-checked.Mui-disabled": { color: "#fff" },
                        "&.Mui-checked.Mui-disabled:hover": { color: "#fff" },
                        "&.Mui-disabled": { color: "#fff" },
                        "&.Mui-disabled:hover": { color: "#fff" },
                      }}
                    />
                  }
                  label="Freelancer"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "#fff",
                        "&.Mui-checked": { color: "#fff" },
                        "&.Mui-checked:hover": { color: "#fff" },
                        "&.Mui-checked.Mui-disabled": { color: "#fff" },
                        "&.Mui-checked.Mui-disabled:hover": { color: "#fff" },
                        "&.Mui-disabled": { color: "#fff" },
                        "&.Mui-disabled:hover": { color: "#fff" },
                      }}
                    />
                  }
                  label="Remote work"
                />
              </FormGroup>
              <div className="m-5 text-lg">{"Skill"}</div>
              <div className="m-5">
                <select
                  name=""
                  id=""
                  className="bg-black"
                  onChange={(e) => {
                    setChoosedSkill(e.target.value);
                  }}
                >
                  {skillList.map((skill) => (
                    <option value={skill} key={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>
              <div className="m-5 text-lg">{"Sort by"}</div>
            </div>
            <div className="flex flex-col w-4/5 mx-10">
              <div>{message}</div>
              {data.map((mapUser) => (
                <div className="flex h-48 mb-10  bg-[#2c2830]" key={mapUser.id}>
                  <div className="flex flex-col w-2/5 h-full p-3">
                    <div className="flex h-3/5">
                      {/* round profile picture */}
                      <div className="w-2/5">
                        <Link to={"/profile/" + mapUser.id}>
                          <div className="w-20 h-20 bg-gray-500 rounded-full">
                            <img
                              className="w-20 h-20 rounded-full"
                              src={mapUser.image}
                              alt="profile"
                            />
                          </div>
                        </Link>
                      </div>
                      <div className="flex-col w-3/5 font-bold">
                        <div className="flex items-center justify-between my-2">
                          <div className="mr-2">{mapUser.name}</div>
                          {mapUser.id !== user.id && (
                            <Button
                              variant="contained"
                              color="primary"
                              className="w-4 h-6"
                              onClick={() => {
                                setClickedUser(mapUser);
                                handleOpenInviteDialog();
                              }}
                            >
                              <img
                                src="/assets/icons/addPeople.png"
                                className="w-3 h-3 mr-1"
                                alt=""
                              />{" "}
                              invite
                            </Button>
                          )}
                        </div>

                        <div className="text-xs text-gray-300">
                          {mapUser.jobStr}
                        </div>
                        <div className="flex mt-3 text-xs font-bold text-gray-300">
                          <img
                            src="/assets/icons/location.png"
                            className="w-3 h-3"
                            alt=""
                          />{" "}
                          {mapUser.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-2 text-xs text-gray-300 h-2/5">
                      <div className="flex">
                        {mapUser.userPreferences &&
                          Object.entries(mapUser.userPreferences).map(
                            ([key, value]) =>
                              value && (
                                <div
                                  key={Math.random()}
                                  className="p-1 my-2 mr-2 bg-[#3c3a41] "
                                >
                                  {key}
                                </div>
                              )
                          )}
                        <div></div>
                      </div>
                      <div>skills: {mapUser.skillStr}</div>
                    </div>
                  </div>
                  {/* <div className="flex w-1/4 bg-black">123</div> */}
                  {portfolioDetail[mapUser.id - 1] &&
                    portfolioDetail[mapUser.id - 1].length > 0 &&
                    portfolioDetail[mapUser.id - 1].map((work) => (
                      <div
                        className="relative flex flex-col w-1/5 p-2 m-1"
                        key={Math.random()}
                      >
                        <div className="w-full h-full ">
                          <div className="absolute top-0 left-0 w-full h-full p-2">
                            <div className="w-full h-full transition-opacity duration-300 rounded opacity-0 bg-gradient-to-t from-black to-transparent hover:opacity-100">
                              <div className="relative w-full h-full ">
                                <div className="absolute flex flex-col left-3 bottom-3">
                                  <div className="font-bold h2 text-s">
                                    {work.name}
                                  </div>
                                  <div className="text-xs text-gray-300">
                                    {" "}
                                    {work.about}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {work.image && (
                            <img
                              src={work.image}
                              className="object-cover w-full h-full rounded"
                              alt=""
                            />
                          )}
                        </div>
                        {/* <div className="h-1/5">{work.name}</div> */}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <InviteDialog
          open={openInviteDialog}
          handleClose={handleCloseInviteDialog}
          invitedUser={clickedUser}
          projects={projects}
        />
        <div className="flex-grow"></div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

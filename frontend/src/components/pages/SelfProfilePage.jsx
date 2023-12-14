import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

import Button from "@mui/material/Button";

import Header from "../common/Header";
import Footer from "../common/Footer";

import EditProfileDialog from "../dialog/EditProfileDialog";

import { useUser } from "../../contexts/UserContext";
import { backendurl } from "../../constants/urls";

export default function ProfilePage() {
  const { user, login, logout } = useUser();

  const navigate = useNavigate();

  const storage = window.localStorage;

  const [portfolioDetail, setPortfolioDetail] = useState([]);
  const [openEditProfileDialog, setOpenEditProfileDialog] = useState(false);
  const handleOpenEditProfileDialog = () => {
    setOpenEditProfileDialog(true);
  };

  const handleCloseEditProfileDialog = () => {
    setOpenEditProfileDialog(false);
  };

  async function getPortfolio() {
    if (!user) return;

    let result = [];

    console.log("before", result);

    for (
      let j = 0;
      j < (user.portfolio.length <= 3 ? user.portfolio.length : 3);
      j++
    ) {
      let resp = await fetch(
        `http://${backendurl}/user/work/` + user.portfolio[j],
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let dataNow = await resp.json();
      result = [...result, dataNow];
    }
    console.log(result);
    setPortfolioDetail([...result]);
  }
  useEffect(() => {
    getPortfolio();
  }, [user]);

  function getResume() {
    window.open(user.resumeLink);
  }

  return (
    <div className="min-h-screen  flex flex-col bg-[#242128]">
      <Header />
      {user && (
        <div className="flex justify-center w-full mt-8 text-white">
          <div className="w-3/5">
            <div className="h-52">
              <img
                className="object-cover w-full h-full"
                src={user.bannerImage}
                alt=""
              />
            </div>
            <div className="relative flex p-5  bg-[#2c2830]">
              <div className="w-32 h-32">
                <img
                  className="absolute top-0 object-cover w-32 h-32 rounded-full -translate-y-1/3 left-6"
                  src={user.image}
                  alt=""
                />
              </div>
              <div className="ml-8 ">
                <div className="flex">
                  <div className="text-xl font-bold">{user.name}</div>
                  <div className="flex items-end py-1 ml-3 text-xs">
                    <img
                      src="/assets/icons/location.png"
                      className="w-3"
                      alt=""
                    />{" "}
                    {user.location}
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-300">{user.jobStr}</div>
                <div className="flex mt-4">
                  {user.socialWebsites &&
                    Object.entries(user.socialWebsites).map(([key, value]) => {
                      return (
                        <div key={key} className="">
                          <SocialIcon
                            className="mr-2"
                            url={value}
                            target="_blank"
                            bgColor="#2c2830"
                            style={{ height: 30, width: 30 }}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="px-5">
              <div className="relative">
                <div className="absolute top-0 right-0 w-30">
                  {" "}
                  <Button
                    variant="outlined"
                    className="absolute top-0 right-0 "
                    style={{ color: "#fff", borderColor: "#fff" }}
                    size="small"
                    onClick={() => {
                      setOpenEditProfileDialog(true);
                    }}
                  >
                    Edit profile
                  </Button>
                </div>
                <div className="mt-8 text-xl">About me</div>
                <div className="mt-2 mb-5">{user.about}</div>
                <Button variant="contained" color="primary" onClick={getResume}>
                  My Resume
                </Button>
              </div>
              <div className="my-14 ">
                <div className="flex items-end">
                  <div className="text-xl">Portfolio</div>
                  {"\u00a0\u00a0\u00a0\u00a0\u00a0"}
                  <span> ..more</span>
                </div>

                <div className="flex justify-center mt-8">
                  {portfolioDetail &&
                    portfolioDetail.map((work) => (
                      <div
                        className={
                          "flex flex-col items-center h-72 w-1/" +
                          portfolioDetail.length.toString()
                        }
                        key={Math.random()}
                      >
                        <div className="flex justify-center mx-4 h-3/4">
                          <img
                            src={work.image}
                            className="object-cover w-full rounded-md"
                            alt=""
                          />
                        </div>
                        <div className="mt-3 h-1/5 h2">{work.name}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <EditProfileDialog
        open={openEditProfileDialog}
        handleClose={handleCloseEditProfileDialog}
        user={user}
      />
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
}

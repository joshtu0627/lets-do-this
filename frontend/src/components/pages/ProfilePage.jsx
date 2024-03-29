import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

import Button from "@mui/material/Button";

import EditProfileDialog from "../dialog/EditProfileDialog";

import WorkDialog from "../dialog/WorkDialog";

import Header from "../common/Header";
import Footer from "../common/Footer";

import { useUser } from "../../contexts/UserContext";
import { backendurl } from "../../constants/urls";

export default function ProfilePage() {
  const { user, login, logout } = useUser();
  const [profileUser, setUser] = useState([]);
  const [portfolioDetail, setPortfolioDetail] = useState([]);
  const [openEditProfileDialog, setOpenEditProfileDialog] = useState(false);

  const [openWorkDialog, setOpenWorkDialog] = useState(false);
  const [openWork, setOpenWork] = useState({});

  const handleOpenWorkDialog = () => {
    setOpenWorkDialog(true);
  };

  const handleCloseWorkDialog = () => {
    setOpenWorkDialog(false);
  };

  const handleOpenEditProfileDialog = () => {
    setOpenEditProfileDialog(true);
  };

  const handleCloseEditProfileDialog = () => {
    setOpenEditProfileDialog(false);
  };
  const { id } = useParams();

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

  async function getPortfolio() {
    if (!profileUser.portfolio || profileUser.portfolio.length === 0) return;

    let portfolioLength = Math.min(profileUser.portfolio.length, 3);
    let portfolioRequests = profileUser.portfolio
      .slice(0, portfolioLength)
      .map((portfolioId) =>
        fetchData(`http://${backendurl}/user/work/${portfolioId}`)
      );

    let result = await Promise.all(portfolioRequests);
    setPortfolioDetail(result);
  }

  useEffect(() => {
    getPortfolio();
  }, [profileUser]);

  useEffect(() => {
    fetchData(`http://${backendurl}/user/profileById/${id}`).then((data) => {
      if (!data) return;
      data.jobStr = data.job ? data.job.join(" / ") : "";
      setUser(data);
    });
  }, [id]);

  // fetchData 函數，可以從之前的示例中獲得

  function getResume() {
    window.open(profileUser.resumeLink);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#242128]">
      <Header />
      <div className="flex justify-center w-full mt-8 text-white">
        <div className="w-3/5 overflow-hidden rounded-xl">
          <div className="h-52">
            {profileUser.bannerImage && (
              <img
                className="object-cover w-full h-full"
                src={profileUser.bannerImage}
                alt=""
              />
            )}
          </div>
          <div className="relative flex p-5  bg-[#2c2830] rounded-b-xl">
            <div className="w-32 h-32">
              {profileUser.image && (
                <img
                  className="absolute top-0 object-cover w-32 h-32 rounded-full -translate-y-1/3 left-6"
                  src={profileUser.image}
                  alt=""
                />
              )}
            </div>
            <div className="ml-8 ">
              <div className="flex">
                <div className="text-xl font-bold">{profileUser.name}</div>
                <div className="flex items-end py-1 ml-3 text-xs">
                  <img
                    src="/assets/icons/location.png"
                    className="w-3"
                    alt=""
                  />{" "}
                  {profileUser.location}
                </div>
              </div>

              <div className="mt-3 text-xs text-gray-300">
                {profileUser.jobStr}
              </div>
              <div className="flex mt-4">
                {profileUser.socialWebsites &&
                  Object.entries(profileUser.socialWebsites).map(
                    ([key, value]) => {
                      return (
                        <div key={key} className="">
                          <SocialIcon
                            className="mr-2"
                            url={value}
                            target="_blank"
                            bgColor="#2c2830"
                            // fgColor="#BEBEC2"
                            style={{ height: 30, width: 30 }}
                          />
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
          </div>
          <div className="mt-8 ">
            <div className="relative p-5 bg-[#2c2830] overflow-hidden rounded-xl">
              <div className="absolute right-5 top-8 w-30">
                {" "}
                {profileUser.id === user.id && (
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
                )}
              </div>
              <div className="text-3xl h2">About me</div>
              <div className="mt-2 mb-5 gray-text">{profileUser.about}</div>
              <Button variant="contained" color="primary" onClick={getResume}>
                My Resume
              </Button>
            </div>
            <div className="p-5 my-14 bg-[#2c2830] overflow-hidden rounded-xl">
              <div className="flex items-end">
                <div className="text-3xl h2">Portfolio</div>
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
                      <div
                        className="flex justify-center mx-4 overflow-hidden cursor-pointer h-3/4"
                        onClick={() => {
                          setOpenWork(work);
                          setOpenWorkDialog(true);
                        }}
                      >
                        <img
                          src={work.image}
                          className="object-cover w-full duration-500 ease-in-out rounded-md hover:transform hover:scale-110"
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
      <WorkDialog
        open={openWorkDialog}
        handleClose={handleCloseWorkDialog}
        work={openWork}
      />
      <EditProfileDialog
        open={openEditProfileDialog}
        handleClose={handleCloseEditProfileDialog}
        user={profileUser}
      />
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
}

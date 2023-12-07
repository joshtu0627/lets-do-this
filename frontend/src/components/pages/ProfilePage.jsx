import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

import Button from "@mui/material/Button";

import EditProfileDialog from "../dialog/EditProfileDialog";

import Header from "../common/Header";
import Footer from "../common/Footer";

export default function ProfilePage() {
  const [user, setUser] = useState([]);
  const [portfolioDetail, setPortfolioDetail] = useState([]);
  const [openEditProfileDialog, setOpenEditProfileDialog] = useState(false);
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
    if (!user.portfolio || user.portfolio.length === 0) return;

    let portfolioLength = Math.min(user.portfolio.length, 3);
    let portfolioRequests = user.portfolio
      .slice(0, portfolioLength)
      .map((portfolioId) =>
        fetchData(`http://localhost:8000/api/1.0/user/work/${portfolioId}`)
      );

    let result = await Promise.all(portfolioRequests);
    setPortfolioDetail(result);
  }

  useEffect(() => {
    getPortfolio();
  }, [user]);

  useEffect(() => {
    fetchData(`http://localhost:8000/api/1.0/user/profileById/${id}`).then(
      (data) => {
        if (!data) return;
        data.jobStr = data.job ? data.job.join(" / ") : "";
        setUser(data);
      }
    );
  }, [id]);

  // fetchData 函數，可以從之前的示例中獲得

  function getResume() {
    window.open(user.resumeLink);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#242128]">
      <Header />
      <div className="flex justify-center w-full mt-8 text-white">
        <div className="w-3/5 overflow-hidden rounded-xl">
          <div className="h-52">
            {user.bannerImage && (
              <img
                className="object-cover w-full h-full"
                src={user.bannerImage}
                alt=""
              />
            )}
          </div>
          <div className="relative flex p-5  bg-[#2c2830] rounded-b-xl">
            <div className="w-32 h-32">
              {user.image && (
                <img
                  className="absolute top-0 object-cover w-32 h-32 rounded-full -translate-y-1/3 left-6"
                  src={user.image}
                  alt=""
                />
              )}
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
                          // fgColor="#BEBEC2"
                          style={{ height: 30, width: 30 }}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="mt-8 ">
            <div className="relative p-5 bg-[#2c2830] overflow-hidden rounded-xl">
              <div className="absolute right-5 top-8 w-30">
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
              <div className="text-3xl h2">About me</div>
              <div className="mt-2 mb-5 gray-text">{user.about}</div>
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

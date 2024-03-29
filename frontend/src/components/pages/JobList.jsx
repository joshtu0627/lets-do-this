import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import theme from "../../theme/lowerCaseTheme";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Header from "../common/Header";
import Footer from "../common/Footer";

import { skillList, typeList, jobList } from "../../data/data";
import { backendurl } from "../../constants/urls";

import ApplyDialog from "../dialog/ApplyDialog";

export default function ProjectList() {
  const [data, setData] = useState([]);
  const [choosedSkill, setChoosedSkill] = useState("");
  const [choosedJob, setChoosedJob] = useState("");
  const [message, setMessage] = useState("");
  const [clickedJob, setClickedJob] = useState("None");

  const [openApplyDialog, setOpenApplyDialog] = useState(false);

  const handleOpenApplyDialog = () => {
    setOpenApplyDialog(true);
  };

  const handleCloseApplyDialog = () => {
    setOpenApplyDialog(false);
  };

  function getAllJob() {
    async function fetchData() {
      let result = await fetch(`http://${backendurl}/project/job/allJob`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      result = await result.json();
      setMessage("");
      setData(result);
      console.log(result);
    }
    fetchData();
  }

  function getChoosedJob() {
    setMessage("searching...");
    setData([]);
    async function fetchData() {
      let result = await fetch(
        `http://${backendurl}/project/job/${choosedJob}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      result = await result.json();

      setData(result);
      setMessage("");
      console.log(result);
    }
    fetchData();
  }

  useEffect(() => {
    setMessage("searching...");
    setData([]);
    if (choosedJob === "" || choosedJob === "None") {
      getAllJob();
    } else {
      getChoosedJob();
    }
  }, [choosedJob]);

  useEffect(() => {
    getAllJob();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="h-screen flex flex-col bg-[#1A171D]">
        <Header />
        <div className="flex justify-center text-white">
          <div className="flex w-5/6 m-10">
            <div className="w-1/5 rounded-xl mx-10 border border-gray-400  bg-[#2c2830]">
              <div className="m-5 text-lg">{"Job Type"}</div>
              <div className="m-5">
                <select
                  name=""
                  id=""
                  className="w-40 bg-black"
                  onChange={(e) => {
                    setChoosedJob(e.target.value);
                  }}
                >
                  {jobList.map((job) => (
                    <option value={job} key={job}>
                      {job}
                    </option>
                  ))}
                </select>
              </div>
              <div className="m-5 text-lg">{"Require Skill"}</div>
              <div className="m-5">
                <select
                  name=""
                  id=""
                  className="w-40 bg-black"
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
            </div>
            <div className="grid w-4/5 grid-cols-2 mx-10">
              {message}
              {data.map((job, index) => (
                <div
                  className="flex flex-col h-56 mx-6 mb-6 bg-[#2c2830] rounded-xl"
                  key={job.id}
                >
                  <Link
                    to={`/project/${job.projectId}`}
                    className="relative flex p-2 h-1/3"
                  >
                    <div className="absolute w-12 h-12 ml-2 rounded-full top-3">
                      <img
                        src={job.image}
                        className="object-cover w-full h-full rounded-full "
                        alt=""
                      />
                    </div>
                    <div className="flex items-center justify-center w-full">
                      <div className="flex flex-col">
                        <div className="text-center h2">{job.name}</div>
                        <div className="text-xs text-center text-gray-300">
                          Looking for: {job.jobType}
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-col px-5 pt-2 text-s h-2/3 ">
                    <div className="h-3/5">{job.about}</div>
                    <div className="h-2/5">
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => {
                          handleOpenApplyDialog();
                          setClickedJob(job);
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ApplyDialog
          open={openApplyDialog}
          handleClose={handleCloseApplyDialog}
          job={clickedJob}
        />
        <div className="flex-grow"></div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

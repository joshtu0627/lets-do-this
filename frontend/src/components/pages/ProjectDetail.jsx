import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useUser } from "../../contexts/UserContext";

import Header from "../common/Header";
import Footer from "../common/Footer";
import ProjectAbout from "../projectpage/ProjectAbout";
import ProjectTasks from "../projectpage/ProjectTasks";
import ProjectSchedule from "../projectpage/ProjectSchedule";
import ProjectChat from "../projectpage/ProjectChat";

export default function ProjectDetail() {
  const { user, login, logout } = useUser();

  const [project, setProject] = useState([]);
  const [members, setMembers] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const { id } = useParams();

  const theme = createTheme({
    components: {
      MuiTab: {
        styleOverrides: {
          root: {
            color: "#BEBEC2", // 未選中的文字顏色
          },
        },
      },
    },
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/1.0/project/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setProject(data);
      });
  }, [id]);

  useEffect(() => {
    if (!project.members) return;

    let result = [];
    async function fetchData() {
      for (let member of project.members) {
        console.log(member);
        let resp = await fetch(
          "http://localhost:8000/api/1.0/user/profileById/" + member.userId,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let dataNow = await resp.json();
        dataNow.role = member.role;
        result = [...result, dataNow];
      }
      console.log("before", result);

      console.log(result);
      setMembers([...result]);
    }
    fetchData();
  }, [project]);
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <div className="min-h-screen flex flex-col bg-[#1A171D] ">
      <Header />

      <div className="flex justify-center w-full mt-8 overflow-hidden text-white ">
        <div className="w-3/5 overflow-hidden rounded-xl">
          <div className="h-52 ">
            {project.bannerImage && (
              <img
                className="object-cover w-full h-full "
                src={project.bannerImage}
                alt=""
              />
            )}
          </div>
          <div className="relative flex p-5  bg-[#2c2830] rounded-b-xl">
            <div className="w-32 h-32 ">
              {project.image && (
                <img
                  className="absolute top-0 object-cover w-32 h-32 rounded-full -translate-y-1/3 left-6"
                  src={project.image}
                  alt=""
                />
              )}
            </div>
            <div className="ml-8 ">
              <div className="flex items-end">
                <div className="text-3xl h2">{project.name}</div>
                {project.tag &&
                  project.tag.map((tag) => (
                    <div
                      key={tag}
                      className="inline-block ml-3 px-2 bg-[#3c3a41] rounded-md text-s text-gray-300"
                    >
                      #{tag}
                    </div>
                  ))}
              </div>
              <div className="flex items-center mt-5">
                <div className="mr-3">Hiring : </div>

                {project.hiring &&
                  project.hiring.map((job) => (
                    <div
                      key={job}
                      className="inline-block mr-2  px-2 py-1 bg-[#3c3a41] rounded-md "
                    >
                      {job}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <ThemeProvider theme={theme}>
              <Tabs value={tabValue} aria-label="basic tabs example">
                <Tab
                  label="Overview"
                  {...a11yProps(0)}
                  onClick={() => {
                    setTabValue(0);
                  }}
                />
                <Tab
                  label="Tasks"
                  {...a11yProps(1)}
                  onClick={() => {
                    setTabValue(1);
                  }}
                />
                <Tab
                  label="Schedule"
                  {...a11yProps(2)}
                  onClick={() => {
                    setTabValue(2);
                  }}
                />
                <Tab
                  label="Team"
                  {...a11yProps(3)}
                  onClick={() => {
                    setTabValue(3);
                  }}
                />
                <Tab
                  label="Settings"
                  {...a11yProps(4)}
                  onClick={() => {
                    setTabValue(4);
                  }}
                />
                <Tab
                  label="Chat"
                  {...a11yProps(5)}
                  onClick={() => {
                    setTabValue(5);
                  }}
                />
              </Tabs>
            </ThemeProvider>
          </div>
          {tabValue === 0 && (
            <ProjectAbout project={project} members={members} />
          )}
          {tabValue === 1 && <ProjectTasks />}
          {tabValue === 2 && <ProjectSchedule />}
          {tabValue === 5 && (
            <ProjectChat project={project} members={members} user={user} />
          )}
        </div>
      </div>
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
}

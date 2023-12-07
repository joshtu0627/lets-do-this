import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Header from "../common/Header";
import Footer from "../common/Footer";
import ProjectAbout from "../projectpage/ProjectAbout";

export default function ProjectDetail() {
  const [project, setProject] = useState([]);
  const [members, setMembers] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const { id } = useParams();

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

  return (
    <div className="min-h-screen flex flex-col bg-[#1A171D]">
      <Header />

      <div className="flex justify-center w-full mt-8 text-white">
        <div className="w-3/5">
          <div className="h-52">
            {project.bannerImage && (
              <img
                className="object-cover w-full h-full"
                src={project.bannerImage}
                alt=""
              />
            )}
          </div>
          <div className="relative flex p-5  bg-[#2c2830]">
            <div className="w-32 h-32">
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
            <Tabs value={tabValue} aria-label="basic tabs example">
              <Link to=""></Link>
              <Tab label="Item One" />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
            </Tabs>
          </div>
          <Routes>
            <Route
              path="/"
              element={<ProjectAbout project={project} members={members} />}
            />
          </Routes>
        </div>
      </div>
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
}

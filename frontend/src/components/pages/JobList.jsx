import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import theme from "../../theme/lowerCaseTheme";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Header from "../common/Header";
import Footer from "../common/Footer";

import { skillList, typeList } from "../../data/data";

export default function ProjectList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let result = await fetch(
        "http://localhost:8000/api/1.0/project/job/allJob",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      result = await result.json();

      setData(result);
      console.log(result);
    }
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="h-screen flex flex-col bg-[#242128]">
        <Header />
        <div className="flex justify-center text-white">
          <div className="flex w-5/6 m-10">
            <div className="w-1/5 mx-10 border border-gray-400">
              <div className="m-5 text-lg">{"Require Skill"}</div>
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
            </div>
            <div className="grid w-4/5 grid-cols-2 mx-10">
              {data.map((job) => (
                <div
                  className="flex flex-col h-48 mx-6 mb-6 bg-[#2c2830]"
                  key={job.id}
                >
                  <Link
                    to={`/project/${job.projectId}`}
                    className="relative flex p-2 h-1/3"
                  >
                    <div className="absolute w-12 h-12 ml-2 rounded-full">
                      <img
                        src={job.image}
                        className="object-cover w-full h-full rounded-full "
                        alt=""
                      />
                    </div>
                    <div className="flex items-end justify-center w-full">
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
                      <Button variant="contained" size="small" color="primary">
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-grow"></div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

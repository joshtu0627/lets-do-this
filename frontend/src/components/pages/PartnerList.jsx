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

export default function PartnerList() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [choosedSkill, setChoosedSkill] = useState("None");
  const [portfolioDetail, setPortfolioDetail] = useState([]);

  function concatJson(job) {
    let result = "";
    for (let i = 0; i < 4; i++) {
      if (!job[i]) break;
      result += job[i];
      if (i !== 3) {
        result += ", ";
      }
    }
    return result;
  }

  async function getPortfolio() {
    let result = Array(data.length).fill([]);

    console.log("before", result);

    for (let i = 0; i < data.length; i++) {
      if (data[i].portfolio) {
        for (let j = 0; j < data[i].portfolio.length; j++) {
          console.log(i, j);
          let resp = await fetch(
            "http://localhost:8000/api/1.0/user/work/" + data[i].portfolio[j],
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          let dataNow = await resp.json();
          result[i] = [...result[i], dataNow];
        }
      }
      while (result[i].length < 3) {
        result[i].push({});
      }
    }
    console.log(result);
    setPortfolioDetail([...result]);
  }

  function getAllUser() {
    fetch("http://localhost:8000/api/1.0/user/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);

        for (let i = 0; i < data.length; i++) {
          if (data[i].job && data[i].skill) {
            data[i].jobStr = data[i].job.join(", ");
            data[i].skillStr = data[i].skill.join(", ");
          }
        }
        if (data.length === 0) {
          setMessage("No result found");
        } else {
          setMessage("");
        }
        setData(data);
      });
  }

  useEffect(() => {
    console.log(portfolioDetail);
  }, [portfolioDetail]);

  function getChoosedSkill() {
    setMessage("searching...");
    setData([]);
    // to lower case
    fetch(
      "http://localhost:8000/api/1.0/user/experties/" +
        choosedSkill.toLowerCase(),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then(async (data) => {
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
          data[i].jobStr = concatJson(data[i].job);
          data[i].skillStr = concatJson(data[i].skill);
        }
        if (data.length === 0) {
          setMessage("No result found");
        } else {
          setMessage("");
        }
        setData(data);
      });
  }

  // useEffect(() => {
  //   getAllUser();
  // }, []);

  useEffect(() => {
    if (choosedSkill === "None") {
      console.log("bbbbb");
      getAllUser();
      return;
    }
    console.log("aaaaa");
    getChoosedSkill();
  }, []);

  useEffect(() => {
    getPortfolio();
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen flex flex-col bg-[#1A171D]">
        <Header />
        <div className="flex justify-center text-white">
          <div className="flex w-5/6 m-10">
            <div className="w-1/5 mx-10 border border-gray-400">
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
              {data.map((user) => (
                <div className="flex h-48 my-5  bg-[#2c2830]" key={user.id}>
                  <div className="flex flex-col w-2/5 h-full p-3">
                    <div className="flex h-3/5">
                      {/* round profile picture */}
                      <div className="w-2/5">
                        <Link to={"/profile/" + user.id}>
                          <div className="w-20 h-20 bg-gray-500 rounded-full">
                            <img
                              className="w-20 h-20 rounded-full"
                              src={user.image}
                              alt="profile"
                            />
                          </div>
                        </Link>
                      </div>
                      <div className="flex-col w-3/5 font-bold">
                        <div className="flex items-center justify-between my-2">
                          <div className="mr-2">{user.name}</div>
                          <Button
                            variant="contained"
                            color="primary"
                            className="w-4 h-6"
                          >
                            <img
                              src="/assets/icons/addPeople.png"
                              className="w-3 h-3 mr-1"
                              alt=""
                            />{" "}
                            invite
                          </Button>
                        </div>

                        <div className="text-xs text-gray-300">
                          {user.jobStr}
                        </div>
                        <div className="flex mt-3 text-xs font-bold text-gray-300">
                          <img
                            src="/assets/icons/location.png"
                            className="w-3 h-3"
                            alt=""
                          />{" "}
                          {user.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-2 text-xs text-gray-300 h-2/5">
                      <div className="flex">
                        {user.userPreferences &&
                          Object.entries(user.userPreferences).map(
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
                      <div>skills: {user.skillStr}</div>
                    </div>
                  </div>
                  {/* <div className="flex w-1/4 bg-black">123</div> */}
                  {portfolioDetail[user.id - 1] &&
                    portfolioDetail[user.id - 1].length > 0 &&
                    portfolioDetail[user.id - 1].map((work) => (
                      <div
                        className="flex flex-col w-1/5 p-2 m-1 "
                        key={Math.random()}
                      >
                        <div className="w-full h-full ">
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

        <div className="flex-grow"></div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

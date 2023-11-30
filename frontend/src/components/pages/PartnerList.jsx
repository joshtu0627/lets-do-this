import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../common/Header";
import Footer from "../common/Footer";

import { skillList } from "../../data/data";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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
          data[i].jobStr = concatJson(data[i].job);
          data[i].skillStr = concatJson(data[i].skill);
        }
        console.log(data);
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
  }, [choosedSkill]);

  useEffect(() => {
    getPortfolio();
  }, [data]);

  return (
    <div className="flex flex-col bg-[#242128]">
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
          </div>
          <div className="flex flex-col w-4/5 mx-10">
            <div>{message}</div>
            {data.map((user) => (
              <div className="flex my-5 bg-gray-800 h-44" key={user.id}>
                <div className="flex flex-col w-1/4 h-full p-3 bg-gray-800">
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
                    <div className="flex-col w-3/5">
                      <div>{user.name}</div>

                      <div className="text-xs text-gray-300">{user.jobStr}</div>
                    </div>
                  </div>
                  <div className="flex flex-col text-xs text-gray-300 h-2/5">
                    <div>{user.skillStr}</div>
                    <div className="flex">
                      {Object.entries(user.userPreferences).map(
                        ([key, value]) =>
                          value && (
                            <div
                              key={Math.random()}
                              className="p-1 my-2 mr-2 border"
                            >
                              V {key}
                            </div>
                          )
                      )}
                      <div></div>
                    </div>
                  </div>
                </div>
                {/* <div className="flex w-1/4 bg-black">123</div> */}
                {portfolioDetail[user.id - 1] &&
                  portfolioDetail[user.id - 1].length > 0 &&
                  portfolioDetail[user.id - 1].map((work) => (
                    <div
                      className="flex flex-col w-1/4 bg-black"
                      key={Math.random()}
                    >
                      <div className="w-full bg-white h-4/5">
                        <img
                          src={work.image}
                          className="object-cover w-full h-full"
                          alt=""
                        />
                      </div>
                      <div className="h-1/5">{work.name}</div>
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
  );
}

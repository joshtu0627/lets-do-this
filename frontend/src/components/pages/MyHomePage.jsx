import React, { useState, useEffect } from "react";

import { useParams, useNavigate, Navigate } from "react-router-dom";

import Header from "../common/Header";
import Footer from "../common/Footer";

import { Button } from "@mui/material";

export default function MyHomePage() {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const storage = window.localStorage;

  const navigate = useNavigate();
  useEffect(() => {
    const token = storage.getItem("token");

    // use backend passport to check if user is logged in
    fetch("http://localhost:8000/api/1.0/user/isLoggedIn", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 將 token 放入 Authorization header 中
      },
    })
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message === "success") {
          setUser(data.data);
          console.log("logged in");
        } else {
          console.log("not logged in");
          navigate("/login");
        }
      });
  }, []);

  useEffect(() => {
    if (!user.id) return;
    function fetchUserProjects() {
      fetch(`http://127.0.0.1:8000/api/1.0/user/${user.id}/projects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          //   console.log(resp);
          return resp.json();
        })
        .then((data) => {
          //   console.log(data);
          setProjects(data);
        });
    }
    fetchUserProjects();
  }, [user]);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  return (
    <div className="min-h-screen flex flex-col bg-[#1A171D]">
      <Header />
      <div className="flex justify-center text-white">
        <div className="flex w-5/6 m-10">
          <div className="w-1/5 p-4 h-80 mx-10 border border-gray-400">
            <div className="w-full flex flex-col h-3/5 items-center justify-center border-b">
              <div className="mt-1">
                <img
                  className="w-16 h-16 rounded-full"
                  src={user.image}
                  alt="profile"
                />
              </div>
              <div className="h2 text-xl">{user.name}</div>
              <div className="text-xs text-gray-300 mt-2">
                {user.job && user.job.join(", ")}
              </div>
            </div>
          </div>
          <div className="w-4/5">
            <div className="bg-[#2c2830] h-16 flex items-center px-5">
              <div className="h2">Active Projects</div>
            </div>
            {projects &&
              projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#2c2830] mt-5 h-28 flex justify-between items-center px-5"
                >
                  <div className="flex items-center">
                    <img
                      className="w-16 h-16 rounded-full"
                      src={project.image}
                      alt="project"
                    />
                    <div className="h2 ml-5">{project.name}</div>
                    <div className="h2 ml-5 text-gray-300 border-gray-300 px-2 py-1 rounded-md border">
                      {project.role}
                    </div>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      className="w-4 h-8"
                      style={{ fontFamily: "Domine" }}
                    >
                      view
                    </Button>
                  </div>
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

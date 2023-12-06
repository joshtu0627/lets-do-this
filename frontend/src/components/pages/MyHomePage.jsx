import React, { useState, useEffect } from "react";

import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

import Header from "../common/Header";
import Footer from "../common/Footer";

import { Button } from "@mui/material";

import CreateProjectDialog from "../dialog/CreateProject";

export default function MyHomePage() {
  const { user, login, logout } = useUser();
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  useEffect(() => {
    // if (!user) {
    //   navigate("/login");
    // } else {
    //   console.log(user);
    // }
  }, []);

  useEffect(() => {
    if (!user) return;
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
      {user && (
        <>
          <Header />
          <div className="flex justify-center text-white">
            <div className="flex w-5/6 m-10">
              <div className="w-1/5 p-4 mx-10 border border-gray-400 h-80">
                <div className="flex flex-col items-center justify-center w-full border-b h-3/5">
                  <div className="mt-1">
                    <img
                      className="w-16 h-16 rounded-full"
                      src={user.image}
                      alt="profile"
                    />
                  </div>
                  <div className="text-xl h2">{user.name}</div>
                  <div className="mt-2 text-xs text-gray-300">
                    {user.job && user.job.join(", ")}
                  </div>
                </div>
              </div>
              <div className="w-4/5">
                <div className="mb-5">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    + Create a new project
                  </Button>
                </div>

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
                        <div className="ml-5 h2">{project.name}</div>
                        <div className="px-2 py-1 ml-5 text-gray-300 border border-gray-300 rounded-md h2">
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
          <CreateProjectDialog open={open} handleClose={handleClose} />
          <Footer />
        </>
      )}
    </div>
  );
}

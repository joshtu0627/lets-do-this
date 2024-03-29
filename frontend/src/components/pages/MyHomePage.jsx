import React, { useState, useEffect } from "react";

import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

import Header from "../common/Header";
import Footer from "../common/Footer";

import { Button } from "@mui/material";
import { MdOutlineComputer } from "react-icons/md";

import CreateProjectDialog from "../dialog/CreateProject";

import { backendurl } from "../../constants/urls";

export default function MyHomePage() {
  const { user, login, logout } = useUser();
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    function fetchUserProjects() {
      fetch(`http://${backendurl}/user/${user.id}/projects`, {
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
  }, [user, refetch]);

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
              <div className="flex flex-col items-center justify-center w-1/5 rounded-xl p-4 mx-10 border border-gray-500 h-80 bg-[#2c2830]">
                <div className="relative flex flex-col items-center justify-center w-full border-b h-3/5">
                  {/* <img
                    className="absolute z-0 object-cover w-full h-full opacity-25"
                    src={user.bannerImage}
                    alt=""
                  /> */}
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
                <div className="w-4/5 mt-5 h-2/5">
                  <div className="flex">
                    <div className="flex items-center justify-center w-4 mr-2">
                      <img
                        src="/assets/icons/location.png"
                        className="w-4"
                        alt=""
                      />
                    </div>

                    <div className="h2">{user.location}</div>
                  </div>
                  <div className="flex my-1">
                    <div className="flex items-center justify-center w-4 mr-2">
                      <div>
                        <MdOutlineComputer />
                      </div>
                    </div>

                    <div className="h2">
                      Working on{" "}
                      <span className="font-bold"> {projects.length}</span>{" "}
                      projects
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-4/5">
                <div className="bg-[#2c2830] h-20 rounded-xl flex items-center px-5 justify-between">
                  <div className="h2">Active Projects</div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <div className="h2"> + Create a new project</div>
                  </Button>
                </div>
                {projects.length === 0 && (
                  <div className="flex items-center justify-between px-5 mt-5 h-28">
                    <div className="h2">No active projects</div>
                  </div>
                )}
                {projects &&
                  projects.map((project) => (
                    <Link to={`/project/${project.id}`} key={project.id}>
                      <div className="rounded-xl relative bg-[#2c2830] mt-6 h-28 flex justify-between items-center pr-5 overflow-hidden">
                        <img
                          className="absolute z-0 object-cover w-full h-full transition duration-500 ease-in-out opacity-25 hover:transform hover:scale-110"
                          src={project.bannerImage}
                          alt=""
                        />
                        <div className="flex items-center ml-5">
                          <img
                            className="z-10 w-16 h-16 rounded-full"
                            src={project.image}
                            alt="project"
                          />
                          <div className="ml-5 h2">{project.name}</div>
                          <div className="z-10 px-2 py-1 ml-5 text-gray-300 border border-gray-300 rounded-md h2">
                            {project.role}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex-grow"></div>
          <CreateProjectDialog
            open={open}
            handleClose={handleClose}
            setRefetch={setRefetch}
          />
          <Footer />
        </>
      )}
    </div>
  );
}

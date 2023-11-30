import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import Header from "../common/Header";
import Footer from "../common/Footer";

export default function ProjectDetail() {
  const [project, setProject] = useState([]);
  const [members, setMembers] = useState([]);

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
      for (let key in project.members) {
        console.log(key);
        let resp = await fetch(
          "http://localhost:8000/api/1.0/user/profileById/" + key,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let dataNow = await resp.json();
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
            <img
              className="object-cover w-full h-full"
              src={project.bannerImage}
              alt=""
            />
          </div>
          <div className="relative flex p-5  bg-[#2c2830]">
            <div className="w-32 h-32">
              <img
                className="absolute top-0 object-cover w-32 h-32 rounded-full -translate-y-1/3 left-6"
                src={project.image}
                alt=""
              />
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
                <div className="">Hiring : </div>

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
          <div className="px-5  bg-[#2c2830] p-2 mt-8">
            <div>
              <div className="py-3 text-2xl h2">Description</div>
              <div className="mt-2 mb-5">{project.about}</div>
            </div>
          </div>
          <div className="px-5  bg-[#2c2830] p-2 mt-8">
            <div>
              <div className="py-3 text-2xl h2">Progress</div>
              <div className="mt-2 mb-5">{project.progress}</div>
              {project.progressTag &&
                project.progressTag.map((tag) => (
                  <div
                    className="inline-block mr-2 mb-2 px-2 py-1 bg-[#3c3a41] rounded-md"
                    key={tag}
                  >
                    #{tag}
                  </div>
                ))}
            </div>
          </div>

          <div className="px-5  bg-[#2c2830] p-2 mt-8">
            <div>
              <div className="py-3 text-2xl h2">Members</div>
              <div className="flex flex-col mt-3">
                {members &&
                  members.map((member) => (
                    <div
                      className="flex justify-between h-20 my-2"
                      key={member.id}
                    >
                      <Link to={"/profile/" + member.id}>
                        <div className="flex items-center justify-center">
                          <div className="w-16 h-16 mr-5">
                            <img
                              className="object-cover w-full h-full rounded-full"
                              src={member.image}
                              alt=""
                            />
                          </div>
                          <div className="text-xl h2 ">{member.name}</div>
                        </div>
                      </Link>
                      <div className="flex items-center justify-center text-xl h2">
                        {project.members[member.id]}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
}

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
export default function ProjectAbout({ project, members }) {
  useEffect(() => {
    console.log("aaa");
    console.log(project);
    console.log(members);
  }, []);

  return (
    <div>
      {" "}
      <div className="w-full">
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
                    key={member.userId}
                  >
                    <Link to={"/profile/" + member.userId}>
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
                      {member.role}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

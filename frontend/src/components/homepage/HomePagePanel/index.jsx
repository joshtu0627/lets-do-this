import { useParams, useNavigate } from "react-router-dom";
import React from "react";

import Header from "../../common/Header";
import Footer from "../../common/Footer";

import Button from "@mui/material/Button";

export default function index() {
  const navigate = useNavigate();
  return (
    <div className="text-white flex flex-col bg-[#242128]">
      <div className="">
        <img
          src="/assets/homepage/banner.png"
          className="object-cover w-full h-full"
        ></img>
      </div>
      <div className="flex justify-center mt-24">
        <div className="justify-center w-2/3 p-10">
          <div className="flex-col ">
            <div className="text-3xl text-center">What can you do here?</div>
            <div className="flex mt-10">
              <div
                className="flex flex-col w-1/3 mx-5"
                style={{ height: "720px" }}
              >
                <div className="h-5/7">
                  <img
                    src="/assets/homepage/1.png"
                    className="object-cover w-full h-full"
                    alt=""
                  />
                </div>
                <div className="py-10 h-1/6">
                  <div className="text-2xl text-center">
                    Find project partners
                  </div>
                  <div className="mt-5 text-lg text-center">
                    Connect with collaborators for your projects. Explore a
                    diverse talent pool and bring your ideas to life together.
                  </div>
                </div>
              </div>
              <div
                className="flex flex-col w-1/3 mx-8"
                style={{ height: "720px" }}
              >
                <div className="h-5/7">
                  <img
                    src="/assets/homepage/2.png"
                    className="object-cover w-full h-full"
                    alt=""
                  />
                </div>
                <div className="py-10 h-1/6">
                  <div className="text-2xl text-center">
                    Find project to work
                  </div>
                  <div className="mt-5 text-lg text-center">
                    Explore and apply for projects you love.
                  </div>
                </div>
              </div>
              <div
                className="flex flex-col w-1/3 mx-8"
                style={{ height: "720px" }}
              >
                <div className="h-5/7">
                  <img
                    src="/assets/homepage/3.png"
                    className="object-cover w-full h-full"
                    alt=""
                  />
                </div>
                <div className="py-10 h-1/6">
                  <div className="text-2xl text-center">Make friends here!</div>
                  <div className="mt-5 text-lg text-center">
                    Connect and make friends across diverse fields
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center ">
              <Button
                style={{ width: "370px", height: "100px", fontSize: "18px" }}
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate("/login");
                }}
              >
                create an account!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

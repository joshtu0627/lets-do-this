import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

import Button from "@mui/material/Button";

import HomepagePanel from "../homepage/HomePagePanel";

import { useParams, useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  const storage = window.localStorage;

  const [loggedIn, setLoggedIn] = useState(false);

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
          setLoggedIn(true);
          console.log("logged in");
        } else {
          setLoggedIn(false);
          console.log("not logged in");
        }
      });
  }, []);

  return (
    <>
      <HomepagePanel />
    </>
  );
}

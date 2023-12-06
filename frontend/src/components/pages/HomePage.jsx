import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../common/Header";
import Footer from "../common/Footer";

import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import HomepagePanel from "../homepage/HomePagePanel";

import { useUser } from "../../contexts/UserContext";

export default function Homepage() {
  const navigate = useNavigate();

  const { user, login, logout } = useUser();

  useEffect(() => {
    if (user) {
      navigate("/myHomePage");
    }
  }, []);

  return (
    <>
      <Header />

      <HomepagePanel />

      <Footer />
    </>
  );
}

import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

import logo from "../../../assets/logo.png";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const [nowPage, setNowPage] = useState("home");

  const navigate = useNavigate();
  const storage = window.localStorage;
  const [open, setOpen] = React.useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    const currentPath = window.location.href;
    console.log(currentPath);

    if (currentPath.includes("partners")) {
      setNowPage("partners");
    } else if (currentPath.includes("jobs")) {
      setNowPage("jobs");
    } else if (currentPath.includes("selfProfile")) {
      setNowPage("selfProfile");
    } else if (currentPath.includes("login")) {
      setNowPage("login");
    } else if (currentPath.includes("register")) {
      setNowPage("register");
    } else if (currentPath.includes("profile")) {
      setNowPage("profile");
    } else if (currentPath.includes("project")) {
      setNowPage("project");
    } else {
      setNowPage("home");
    }

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
          setLoggedIn(true);
          console.log("logged in");
        } else {
          setLoggedIn(false);
          console.log("not logged in");
        }
      });
  }, []);
  return (
    <header className="relative flex justify-center h-20 text-white bg-black z-99">
      <img
        className="absolute z-0 object-cover w-full h-full opacity-25"
        src="/assets/header/background.jpg"
        alt=""
      />
      <div className="absolute flex justify-center w-full h-full">
        <div className="flex items-center justify-end w-1/3 px-20">
          <Link to={"/partners"}>
            <div
              className={
                "text-l h2 " +
                (nowPage === "partners" ? "border-b-2 border-white" : "")
              }
            >
              Find Partner
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center w-1/5">
          <Link to={"/"}>
            <img className="w-28" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="flex items-center justify-between w-1/3 px-20">
          <Link to={"/jobs"}>
            <div
              className={
                "text-l h2 " +
                (nowPage === "jobs" ? "border-b-2 border-white" : "")
              }
            >
              Find Project
            </div>
          </Link>
          {loggedIn ? (
            <>
              <div className="flex items-center">
                <Link to={"/selfProfile"}>
                  <div className="flex items-center mx-3">
                    <div>
                      <img
                        className="w-8 h-8 rounded-full"
                        src={user.image}
                        alt="profile"
                      />
                    </div>
                    <div className="ml-3">{user.name}</div>
                  </div>
                </Link>
                <Stack direction="row" spacing={2}>
                  <div>
                    <Button
                      ref={anchorRef}
                      id="composition-button"
                      aria-controls={open ? "composition-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleToggle}
                    >
                      <div className="flex items-center w-3 h-5 mx-3">
                        {open ? (
                          <img src="/assets/header/up.png" alt="" />
                        ) : (
                          <img src="/assets/header/down.png" alt="" />
                        )}
                      </div>
                    </Button>
                    <Popper
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      placement="bottom-start"
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === "bottom-start"
                                ? "left top"
                                : "left bottom",
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList
                                autoFocusItem={open}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                onKeyDown={handleListKeyDown}
                              >
                                <MenuItem
                                  onClick={() => {
                                    navigate("/selfProfile");
                                  }}
                                >
                                  Profile
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    storage.removeItem("token");
                                    setLoggedIn(false);
                                    navigate("/");
                                  }}
                                >
                                  Logout
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    navigate("/notifications");
                                  }}
                                >
                                  Notifications
                                </MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </div>
                </Stack>

                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  style={{
                    border: "None",
                    fontSize: "0.8rem",
                  }}
                  onClick={() => {
                    storage.removeItem("token");
                    setLoggedIn(false);
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <Link to={"/login"}>
              <div className="text-l h2">Login / Register</div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function PartnerList() {
  return (
    <div className="h-screen flex flex-col bg-[#242128]">
      <Header />
      <div className="flex justify-center text-white">
        <div className="w-5/6 m-10 flex">
          <div className="w-1/5 mx-10 border border-gray-400">
            <div className="text-lg m-5">{"Skill"}</div>
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
                label="Design"
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
                label="Required"
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
                label="Disabled"
              />
            </FormGroup>
          </div>
          <div className="w-2/5 bg-red-500 mx-10">123</div>
          <div className="w-2/5 bg-blue-500 mx-10">123</div>
        </div>
      </div>

      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
}

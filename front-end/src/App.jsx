import React from "react";
import { Route, Routes } from "react-router-dom";

import taanj from "./assets/TAANJ.png";

import Home from "./pages/Home";
import About from "./pages/About";
import Members from "./pages/Members";
import Photos from "./pages/Photos";

import ResponsiveAppBar from "./components/ResponsiveAppBar";

import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  width: "589px",
  height: "94px",
  marginTop: "2%",
});

const Footer = styled("div")({
  position: "fixed",
  bottom: "3%",
  right: "1%",
  zIndex: "1000",
});

function App() {
  return (
    <div className="App" style={{ padding: "70px" }}>
      <ResponsiveAppBar />
      <Img alt="TAANJ Logo" src={taanj} />
      <Typography
        variant="h6"
        sx={{ textAlign: "center", marginY: "1%", fontFamily: "monospace" }}
      >
        P.O. Box 604, Princeton Junction, NJ 08550
      </Typography>
      <Divider />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/about" element={<About />} />
        <Route path="/photos" element={<Photos />} />
      </Routes>
      <Footer>
        {" "}
        <Avatar alt="fb logo" src="http://tinyurl.com/572fbj7w" />
      </Footer>
    </div>
  );
}

export default App;

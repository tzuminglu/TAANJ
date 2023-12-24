import React from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const { open, drawerWidth } = location;
  console.log(location);

  return (
    <div>

    </div>
  );
}

export default Home;

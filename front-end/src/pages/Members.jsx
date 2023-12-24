import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useLocation } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Members() {
  const location = useLocation();
  let { open, drawerWidth } = location;
  console.log(location);


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center", // Vertically center the content
        justifyContent: "center", // Horizontally center the content
        minHeight: "30vh", // Optionally, if you want the container to take a minimum of 30% of the viewport height
        marginLeft: open ? "240px" : "50px",
      }}
    >
      <Grid container spacing={2}>
        <Grid xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Members;

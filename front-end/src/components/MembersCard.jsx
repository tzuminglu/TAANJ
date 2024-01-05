import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import noImage from "../assets/no-image.png";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function MembersCard({ member }) {
  return (
    <Paper
      sx={{
        p: 2,
        maxWidth: 400,
        width: "100%",
        height: "100%", 
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        position: "relative",
        marginY: "2%",
        marginLeft: "2%",
        display: "flex",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ maxWidth: 128, maxHeight: 128 }}>
            <Img alt="complex" src={noImage} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ fontFamily: "monospace" }}
              >
                {member && member.title}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontFamily: "monospace" }}
              >
                {member && member.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                sx={{
                  cursor: "pointer",
                  textAlign: "right",
                  fontFamily: "monospace",
                }}
                variant="body2"
              >
                Contact
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

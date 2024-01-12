import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";


function SponsorCard({ sponsor }) {
  return (
    <Paper
      sx={{
        p: 2,
        maxWidth: 450,
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
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                sx={{ fontFamily: "monospace", textAlign: "center" }}
              >
                {sponsor && sponsor.name}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontFamily: "monospace", textAlign: "center" }}
              >
                {sponsor && sponsor.phone}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SponsorCard;

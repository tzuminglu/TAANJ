import * as React from "react";
import { useState, useEffect } from "react";

import noImage from "../../assets/no-image.png";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function AffairCard({ affair }) {
  const stringLength = 165;

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Grid item xs={6} sm={6}>
      <Card
        sx={{
          height: 400,
          maxHeight: 550,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardMedia
          sx={{
            minHeight: "60%",
            maxHeight: "60%",
            minWidth: "50%",
            maxWidth: "50%",
          }}
          image={noImage}
          title="org"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            sx={{ fontFamily: "monospace" }}
          >
            {affair && affair.name}
          </Typography>
          {windowSize && windowSize.height > 450 && windowSize.width > 1240 && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: "monospace" }}
            >
              {affair && affair.intro.length > stringLength
                ? affair.intro.substring(0, stringLength) + "..."
                : affair.intro}
            </Typography>
          )}
        </CardContent>
        <CardActions
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            fontFamily: "monospace",
            marginTop: "auto",
          }}
        >
          {affair && (
            <Button href={`${affair.address}`} target="_blank" size="small">
              About
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

export default AffairCard;

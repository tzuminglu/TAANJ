import React from "react";

import { Grid, Divider, Typography } from "@mui/material";

import AffairCard from "../components/AffairCard";
import SponsorCard from "../components/SponsorCard";

const affairs = [
  {
    name: "Ketagalan Media",
    image: "",
    address: "http://www.ketagalanmedia.com/",
    intro:
      "Ketagalan Media is the gateway that informs, inspires, and facilitates the movement of ideas and trends between Taiwan, Asia and the rest of the world.",
  },
  {
    name: "Formosan Association for Public Affairs",
    image: "",
    address: "http://fapa.org/wp/",
    intro:
      "FAPA’s mission is educational. The organization provides US policymakers, the media, scholars and the general public with information on issues related to Taiwan.",
  },
  {
    name: "Oversea Taiwanese for Democacy",
    image: "",
    address: "https://www.facebook.com/overseastaiwanesefordemocracy/",
    intro: "",
  },
  {
    name: "TECO-NYC",
    image: "",
    address: "http://www.roc-taiwan.org/usnyc_en/index.html",
    intro:
      "The Taipei Economic and Cultural Office in New York is one of 12 offices under the Washington D.C.-based Taipei Economic and Cultural Representative Office (TECRO).",
  },
  {
    name: "Outreach for Taiwan",
    image: "",
    address: "https://outreachfortaiwan.org/",
    intro: "",
  },
  {
    name: "Taiwanese  Association of America",
    image: "",
    address: "http://www.taa-usa.org/",
    intro: "",
  },
];

const sponsors = [
  {
    name: "F.C. Federal Credit Union 台灣同鄉信用合作社",
    tele: "886-389-2559",
  },
  { name: "Lee, Alexander M., Esq 李豪台律師", tele: "973-364-1688" },
  { name: "Chang, Frank D.M.D 張資福牙醫師", tele: "609-924-4422" },
  { name: "Lee, Timothy Y, D.D.S 李允文牙醫師", tele: "609-588-0500" },
  { name: "Wang, Ai-Lan Phd., MD 王愛蘭內科醫師", tele: "718-699-9264" },
  { name: "Lin’s Palace 林宮台菜館", tele: "973-993-8668" },
];

function About() {
  return (
    <>
      <Typography
        textAlign="center"
        variant="h4"
        sx={{ marginY: "1%", fontFamily: "monospace", fontWeight: "bold" }}
      >
        More About Taiwan
      </Typography>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {affairs &&
          affairs.map((affair) => {
            return <AffairCard key={affair.name} affair={affair} />;
          })}
      </Grid>
      <Divider sx={{ marginY: 3 }} />
      <Typography
        textAlign="center"
        variant="h4"
        sx={{ marginY: "1%", fontFamily: "monospace", fontWeight: "bold" }}
      >
        TAA-NJ Sponsors
      </Typography>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {sponsors &&
          sponsors.map((sponsor) => {
            return <SponsorCard key={sponsor.name} sponsor={sponsor} />;
          })}
      </Grid>
    </>
  );
}

export default About;

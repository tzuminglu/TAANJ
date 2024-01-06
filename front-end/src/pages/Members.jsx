import * as React from "react";
import MembersCard from "../components/Member/MembersCard";
import { Grid } from "@mui/material";

const members = [
  { title: "President", name: "Tina", contact: "" },
  { title: "Vice President", name: "小賴", contact: "" },
  { title: "Treasurer", name: "Chen-Chao Wang (震昭叔叔)", contact: "" },
  { title: "Activity coordinator", name: "Huei-Ling", contact: "" },
  { title: "Activity coordinator", name: "U Zaw (阿郎)", contact: "" },
  { title: "Activity coordinator", name: "Jerry Lu", contact: "" },
  { title: "Activity coordinator", name: "Alvin Lin (林士硯)", contact: "" },
  { title: "Activity coordinator", name: "Ann", contact: "" },
  { title: "Activity coordinator", name: "小沈", contact: "" },
];

export default function Members() {
  return (
    <Grid
      container
      sx={{ display: "flex", justifyContent: "center",  alignItems: "center" }}
    >
      {members &&
        members.map((member) => {
          return <MembersCard key={member.name} member={member} />;
        })}
    </Grid>
  );
}

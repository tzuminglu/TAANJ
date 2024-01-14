import { useEffect } from "react";
import MembersCard from "../components/Members/MembersCard";
import { Grid } from "@mui/material";
import useFetchData from "../hooks/useFetchData";

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

const memebersURL = "/members";

export default function Members() {
  const {
    mutate: fetchMembers,
    isloading: fetchingMembers,
    error: fecthMembersError,
    data: Membersdata,
  } = useFetchData({ url: memebersURL });

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <Grid
      container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {!fetchingMembers && Membersdata
        ? Membersdata.members.map((member) => {
            return <MembersCard key={member.name} member={member} />;
          })
        : null}
    </Grid>
  );
}

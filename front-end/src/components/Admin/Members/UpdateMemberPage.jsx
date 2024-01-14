import { useEffect } from "react";

import useFetchData from "../../../hooks/useFetchData";
import UpdateMemberCard from "./UpdateMemberCard";

const membersURL = "/members";

function UpdateMemberPage() {
  const {
    mutate: fetchMembers,
    isLoading: fetching,
    error: fetchingError,
    data: membersdata,
  } = useFetchData({ url: membersURL });

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-5">
        {!fetching && membersdata && membersdata.members
          ? membersdata.members.map((member) => (
              <UpdateMemberCard key={member._id} member={member} />
            ))
          : null}
      </div>
    </div>
  );
}

export default UpdateMemberPage;

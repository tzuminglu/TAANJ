import React, { useEffect } from "react";

import useFetchData from "../../../../hooks/useFetchData";
import UpdateOrgCard from "./UpdateOrgCard";

const orgURL = "/about/organization";

function UpdateOrgPage() {
  const {
    mutate: fetchOrg,
    isLoading: fetching,
    error: fetchingError,
    data: data,
  } = useFetchData({ url: orgURL });

  useEffect(() => {
    fetchOrg();
  }, []);


  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-5">
        {!fetching &&
          data &&
          data.orgs &&
          data.orgs.map((org) => <UpdateOrgCard key={org._id} org={org} />)}
      </div>
    </div>
  );
}

export default UpdateOrgPage;

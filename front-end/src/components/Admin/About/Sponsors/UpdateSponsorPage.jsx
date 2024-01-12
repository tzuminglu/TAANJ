import React, { useEffect } from "react";

import useFetchData from "../../../../hooks/useFetchData";
import UpdateSponsorCard from "./UpdateSponsorCard";

const sponsorURL = "/about/sponsor";

function UpdateSponsorPage() {
  const {
    mutate: fetchSponsor,
    isLoading: fetching,
    error: fetchingError,
    data: data,
  } = useFetchData({ url: sponsorURL });

  useEffect(() => {
    fetchSponsor();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-5">
        {!fetching &&
          data &&
          data.sponsors &&
          data.sponsors.map((sponsor) => (
            <UpdateSponsorCard key={sponsor._id} sponsor={sponsor} />
          ))}
      </div>
    </div>
  );
}

export default UpdateSponsorPage;

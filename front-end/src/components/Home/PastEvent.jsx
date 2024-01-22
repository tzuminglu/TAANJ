import React, { useEffect, useState } from "react";
import ActivitySlide from "./ActivitySlide";

import useFetchData from "../../hooks/useFetchData";
const pasteventURL = "/pastevent";

function PastEvent() {
  const {
    mutate: fetchPastEvent,
    isLoading: fecthing,
    error: fetchingError,
    data: activities,
  } = useFetchData({ url: pasteventURL });

  useEffect(() => {
    fetchPastEvent();
  }, []);

  return (
    <>
      <div className="mt-16 mt-12 sm:w-full max-w-screen-xl h-auto mx-2 carousel rounded-box">
        {activities &&
          activities.pastevents.map((activity) => {
            return (
              <ActivitySlide
                key={activity._id}
                activity={activity}
                activitiesNum={activities.length}
              />
            );
          })}
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center py-2 gap-2 w-full">
        {activities &&
          activities.pastevents.map((activity, index) => {
            return (
              <a
                href={`#${activity._id}`}
                className="btn btn-xs"
                key={activity._id}
              >
                {index + 1}
              </a>
            );
          })}
      </div>
    </>
  );
}

export default PastEvent;

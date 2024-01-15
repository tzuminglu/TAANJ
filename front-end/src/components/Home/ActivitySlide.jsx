import React from "react";

import Typography from "@mui/material/Typography";

function ActivitySlide({ activity, activitiesNum }) {
  return (
    <div id={`${activity._id}`} className="carousel-item relative w-full h-auto">
      <img src={activity && activity.imageInfo} alt={activity.name} />
      <a href={activity.url} target="_blank" rel="noopener noreferrer">
        <Typography
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center text-blue-600 bg-gray-900
	 p-2"
          style={{
            color: "rgba(0, 123, 255, 1)",
            backgroundColor: "rgba(17, 24, 39, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgba(0, 123, 255, 1)";
            e.currentTarget.style.backgroundColor = "rgba(17, 24, 39, 1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(0, 123, 255, 0)";
            e.currentTarget.style.backgroundColor = "rgba(156, 163, 175, 0)";
          }}
        >
          {activity && activity.name}
        </Typography>
      </a>
    </div>
  );
}

export default ActivitySlide;

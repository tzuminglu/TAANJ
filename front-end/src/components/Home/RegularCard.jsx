import React from "react";

function RegularCard({ activity }) {
  return (
    <div
      className="preview border-base-300 bg-base-100 rounded-b-box rounded-se-box flex min-h-[6rem] min-w-[18rem] max-w-4xl overflow-x-hidden bg-cover bg-top p-4"
      style={{
        backgroundImage: `url(${activity.bgURL})`,
        backgroundSize: "cover",
      }}
    >
      <div className="card w-96 glass">
        <figure>
          <img src={`${activity.imgURL}`} alt={activity.title} />
        </figure>
        <div className="card-body">
          <h3 className="card-title font-mono text-gray-50 text-base">{activity.title}</h3>
          <p className="font-mono text-sm text-gray-50">{activity.date}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary font-mono"
              onClick={() =>
                (window.location.href = `mailto:${activity.contact}`)
              }
            >
              Contact: {activity.host}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegularCard;

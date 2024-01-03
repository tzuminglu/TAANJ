import React from "react";

import ActivitySlide from "../components/ActivitySlide";
import AboutSlide from "../components/AboutSlide";

const activities = [
  {
    id: "1",
    name: "04/22/2023 A Letter to A'ma《給阿媽的一封信》at 11am - 2pm",
    imageInfo:
      "https://www.taa-nj.org/TAANJ/8868feda09dabf76148d614cad67397c.jpg",
    url: "https://www.facebook.com/media/set/?set=a.303476155389807&type=3",
  },
  {
    id: "2",
    name: "09/16/2023 流麻溝十五號",
    imageInfo:
      "https://www.taa-nj.org/TAANJ/457bf05a10c7e56f9a2542b5c70e7443.jpg",
    url: "https://www.facebook.com/media/set/?set=a.334502925620463&type=3",
  },
  {
    id: "3",
    name: "09/09/2023 UN for Taiwan",
    imageInfo:
      "https://www.taa-nj.org/TAANJ/c7bee42dfcb1edb54dab018e8fa2335b.jpg",
    url: "https://www.facebook.com/media/set/?set=a.334390785631677&type=3",
  },
];

const about = [
  {
    id: "about_1",
    content:
      "We communicate with other ethnic groups to promote mutual understanding and support.",
    url: "https://www.taa-nj.org/TAANJ/b9eabf77b77e33f2eb74d9d38847aa61.jpg",
  },
  {
    id: "about_2",
    content:
      "We enhance the growth of the Taiwanese community and promote the awareness of the Taiwanese culture.",
    url: "https://www.taa-nj.org/TAANJ/e7cef4ef28d3fbb10b0839e6f2419dfb.jpg",
  },
  {
    id: "about_3",
    content:
      "We promote Taiwanese American participation in government activities.",
    url: "https://www.taa-nj.org/TAANJ/749d90c93849465195698a2c17d5a104.jpg",
  },
];

const activitiesNum = activities.length;

function Home() {
  return (
    <>
      {/* // About TAANJ */}
      <div className="flex justify-center items-center">
        <div className="card w-10/12 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-center w-full">
              <h2 className="card-title font-mono text-center text-3xl">
                The Taiwanese Association of American in New Jersey Chapter
                (TAA-NJ)
              </h2>
            </div>
            <p className="font-mono">
              TAA-NJ is a congregation of Taiwanese Americans residing in the
              Central Jersey and the vicinity. The Association was established
              in 1973, and is a non-profit, non-partisan, and non-sectarian
              organization incorporated under the law of the State of New
              Jersey.
            </p>
          </div>
          <figure className="mb-10">
            <img
              src="https://www.taa-nj.org/TAANJ/9066ddf3c7a240b365f6988580b548e5.png"
              alt="TAANJ-Cover"
            />
          </figure>
        </div>
      </div>

      <div className="divider"></div>

      {/* More About TAANJ */}
      <div className="flex items-center justify-center">
        <div className="h-screen carousel carousel-vertical rounded-box">
          {about &&
            about.map((ele) => {
              return <AboutSlide key={ele.id} ele={ele} />;
            })}
        </div>
      </div>

      <div className="divider"></div>

      {/* Past Events Components */}
      <div className="flex justify-center w-full gap-2 relative mt-10">
        <h2 className="absolute top-0 left-1/2 transform -translate-x-1/2 flex justify-center font-mono text-3xl my-0">
          Past Events
        </h2>
        <div className="carousel rounded-box w-7/12 h-auto my-10">
          {activities &&
            activities.map((activity) => {
              return (
                <ActivitySlide
                  key={activity.id}
                  activity={activity}
                  activitiesNum={activitiesNum}
                />
              );
            })}
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center py-2 gap-2 w-full">
          {activities &&
            activities.map((activity) => {
              return (
                <a
                  href={`#${activity.id}`}
                  className="btn btn-xs"
                  key={activity.id}
                >
                  {activity.id}
                </a>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Home;

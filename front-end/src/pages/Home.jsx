import React from "react";

import ActivitySlide from "../components/Home/ActivitySlide";
import AboutSlide from "../components/Home/AboutSlide";
import RegularCard from "../components/Home/RegularCard";
import UpcomingEvent from "../components/Home/UpcomingEvent";

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
  {
    id: "about_4",
    content:
      "We assemble Taiwanese Americans for fellowship, seminars, and other social activities.",
    url: "https://www.taa-nj.org/TAANJ/00700f200059cd2cd1690b740c642f8a.jpg",
  },
  {
    id: "about_5",
    content:
      "We reach out to needy Taiwanese Americans and to provide them with available assistance.",
    url: "https://www.taa-nj.org/TAANJ/744b15fb7c38a25ef80d36edca60af30.jpg",
  },
];

const regularActivities = [
  {
    id: "ra_1",
    title: "New Jersey Living Well Club",
    date: "Every Wednesday",
    contact: "hannaliao@aol.com",
    host: "茂清",
    imgURL: "https://www.taa-nj.org/TAANJ/6767deb527a408be09653f5ff77bc6bf.jpg",
    bgURL: "https://shorturl.at/jIM38",
  },
  {
    id: "ra_2",
    title: "UN for Taiwan Rally (NYC)",
    date: "Every September ",
    contact: "taanjusa@gmail.com",
    host: "TAA-NJ",
    imgURL: "https://www.taa-nj.org/TAANJ/a95ad07cbd82fd1ed2703b94399850a6.jpg",
    bgURL: "https://shorturl.at/DGQR6",
  },
  {
    id: "ra_3",
    title: "Princeton Outreach",
    date: "TBD",
    contact: "taanjusa@gmail.com",
    host: "Blue",
    imgURL: "https://www.taa-nj.org/TAANJ/0b82e7b35ec81f522c13dc58b491fd08.jpg",
    bgURL: "https://shorturl.at/ksBC3",
  },
  {
    id: "ra_4",
    title: "TAA-NJ Summer BBQ",
    date: "Every Summer",
    contact: "taanjusa@gmail.com",
    host: "TAA-NJ",
    imgURL: "https://www.taa-nj.org/TAANJ/9a22c47952fa219011820f52fd22463e.jpg",
    bgURL: "https://shorturl.at/dqORS",
  },
  {
    id: "ra_5",
    title: "Sunday Morning Tennis at Lawrencevill Township middle school",
    date: "Every Sunday 7:30am",
    contact: "tctsai43@gmail.com",
    host: "Dr. Tsai",
    imgURL: "https://www.taa-nj.org/TAANJ/fcd493aa872e5a7a78887caf966def3a.jpg",
    bgURL: "http://tinyurl.com/2v6knszx",
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
                (TAA—NJ)
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

      {/* Goals */}
      <div className="flex items-center justify-center">
        <div className="h-screen carousel carousel-vertical rounded-box">
          {about &&
            about.map((ele) => {
              return <AboutSlide key={ele.id} ele={ele} />;
            })}
        </div>
      </div>

      <div className="divider"></div>

      {/* Upcoming Events */}
      <div className="flex justify-center w-full gap-2 relative">
        <h2 className="absolute top-0 left-1/2 transform -translate-x-1/2 flex justify-center font-mono text-3xl">
          Upcoming Events
        </h2>
        <div className="carousel rounded-box w-7/12 h-auto mt-12">
          <UpcomingEvent />
        </div>
      </div>

      <div className="divider"></div>

      {/* Past Events Components */}
      <div className="flex justify-center w-full gap-2 relative">
        <h2 className="absolute top-0 left-1/2 transform -translate-x-1/2 flex justify-center font-mono text-3xl">
          Past Events
        </h2>
        <div className="carousel rounded-box w-7/12 h-auto mt-12">
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

      {/* Regular Activities */}
      <div className="divider"></div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 sm:mx-1 md:grid-cols-2 md:mx-3 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 xl:gap-3 2xl:grid-cols-5 2xl:gap-3">
        {regularActivities &&
          regularActivities.map((activity) => {
            return <RegularCard key={activity.id} activity={activity} />;
          })}
      </div>
    </>
  );
}

export default Home;

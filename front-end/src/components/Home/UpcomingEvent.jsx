import React, { useEffect } from "react";

import noImage from "../../assets/no-image.png";

import ErrorText from "../General/ErrorText";

import useFetchData from "../../hooks/useFetchData";

const dataURL = "/upcomingevent";

function UpcomingEvent() {
  const {
    mutate: fetchData,
    isLoading: fetching,
    error: fetchError,
    data: data,
  } = useFetchData({ url: dataURL });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {!fetching && data && data.post && (
        <div className="card lg:card-side shadow-xl">
          <figure className="w-full">
            <img
              src={`${data.post.photo ? data.post.photo : noImage}`}
              alt="img"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{data.post.name}</h2>
            {data.post.description.split("\n").map((ele, index) => (
              <p key={index}>{ele}</p>
            ))}
            <p>
              Start Time:&nbsp;
              {data.post.startValue
                .replace("T", " ")
                .replace(/-/g, "/")
                .slice(0, -3)}{" "}
              (ET)
            </p>
            <p>
              End Time:&nbsp;
              {data.post.endValue
                .replace("T", " ")
                .replace(/-/g, "/")
                .slice(0, -3)}
              &nbsp;(ET)
            </p>
            <p>Location:&nbsp;{data.post.location}</p>
            Information:&nbsp;
            <a className="link link-primary" href={data.post.link1}>
              {data.post.link1}
            </a>
            <a className="link link-primary" href={data.post.link2}>
              {data.post.link2}
            </a>
          </div>
        </div>
      )}
      {fetchError && <ErrorText>{fetchError}</ErrorText>}
    </div>
  );
}

export default UpcomingEvent;

import React from "react";

function AboutSlide({ ele }) {
  return (
    <div className="relative carousel-item h-1/2 w-12/12 mb-3 rounded-box">
      <img src={`${ele.url}`} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 p-3 w-full">
        {/* <h5 className="mb-2 text-xl font-medium leading-tight text-white">
          Card title
        </h5> */}
        <p className="mb-4 text-base text-yellow-200 font-mono bg-gray-700 p-3">
          {ele.content}
        </p>
      </div>
    </div>
  );
}

export default AboutSlide;

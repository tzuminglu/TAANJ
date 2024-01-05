import React from "react";

function PhotoSlide({ photo }) {
  return (
    <>
      <div className="relative carousel-item h-full w-full mb-3 rounded-box border-2 flex flex-col items-center justify-center">
        <h2 className="text-center mt-10 font-mono text-xl">{photo.title}</h2>
        <div className="carousel rounded-box mb-16 mt-5 flex items-center">
          {photo &&
            photo.imagesURL.map((url, index) => {
              return (
                <div
                  key={index}
                  className="carousel-item w-1/2 h-1/2 flex items-center justify-center"
                >
                  <img src={url} alt="photo" />
                </div>
              );
            })}
        </div>
        <div className="absolute inset-x-0 bottom-0 mb-3 flex justify-center w-full">
          {photo && (
            <a href={photo.fbURL} target="_blank" rel="noreferrer">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-mono">
                More
              </button>
            </a>
          )}
        </div>
      </div>
    </>
  );
}

export default PhotoSlide;

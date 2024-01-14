import React, { useEffect, useState } from "react";
import PhotoSlide from "../components/Photos/PhotoSlide";
import useFetchData from "../hooks/useFetchData";

const photosURL = "/photos";

function Photos() {
  const {
    mutate: fetchPhotos,
    isLoading: fetching,
    error: fetchPhotosError,
    data: photosData,
  } = useFetchData({ url: photosURL });

  const [displayIndex, setDisplayIndex] = useState(0);

  const handleButtonClick = () => {
    setDisplayIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const displayedPhotos =
    photosData && photosData.photos
      ? photosData.photos.slice(0, displayIndex + 3)
      : undefined;

  return (
    <>
      <div className="mb-4">
        <h4 className="text-center text-3xl font-mono my-10 font-bold">
          Past Events & Photos
        </h4>
      </div>
      <div className="flex relative justify-center min-h-1/2 overflow-hidden">
        <div className="carousel w-full flex">
          {displayedPhotos &&
            displayedPhotos.map((photo) => (
              <div
                key={photo._id}
                className="flex justify-center carousel-item w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-2/5 p-4"
              >
                <PhotoSlide photo={photo} />
              </div>
            ))}
        </div>
        {photosData && photosData.photos.length > displayIndex + 3 ? (
          <button
            className="w-10 h-10 bg-blue-500 rounded-full hover:bg-blue-600 text-white font-mono absolute bottom-0 right-0 m-8 min-h-1/2 overflow-hidden"
            onClick={handleButtonClick}
          >
            +
          </button>
        ) : null}
      </div>
    </>
  );
}

export default Photos;

import React, { useEffect, useState } from "react";
import "../style.css";

import PhotoSlide from "../components/PhotoSlide";

const photos = [
  {
    id: "photo_1",
    title: "09/16/2023 流麻溝十五號",
    imagesURL: [
      "https://www.taa-nj.org/TAANJ/457bf05a10c7e56f9a2542b5c70e7443.jpg",
      "https://www.taa-nj.org/TAANJ/d5da51cd47dc58529f0b1a84578fdb41.jpg",
      "https://www.taa-nj.org/TAANJ/5f49c065c9573c0cb16fe0fbe87c250f.jpg",
      "https://www.taa-nj.org/TAANJ/287a7dc8e40fe203f2c2b77a60202dc2.jpg",
    ],
    fbURL: "https://www.facebook.com/media/set/?set=a.334502925620463&type=3",
  },
  {
    id: "photo_2",
    title: "09/09/2023 UN for Taiwan",
    imagesURL: [
      "https://www.taa-nj.org/TAANJ/c7bee42dfcb1edb54dab018e8fa2335b.jpg",
      "https://www.taa-nj.org/TAANJ/32b27c9339fe8a667bf570e9eb866b8d.jpg",
      "https://www.taa-nj.org/TAANJ/334f0e4ce303603ef2312934cd003bf5.jpg",
      "https://www.taa-nj.org/TAANJ/07c08b845f5d348a35dc5e38958d1b0c.jpg",
    ],
    fbURL: "https://www.facebook.com/media/set/?set=a.334390785631677&type=3",
  },
  {
    id: "photo_3",
    title: "09/09/2023 UN for Taiwan",
    imagesURL: [
      "https://www.taa-nj.org/TAANJ/c7bee42dfcb1edb54dab018e8fa2335b.jpg",
      "https://www.taa-nj.org/TAANJ/32b27c9339fe8a667bf570e9eb866b8d.jpg",
      "https://www.taa-nj.org/TAANJ/334f0e4ce303603ef2312934cd003bf5.jpg",
      "https://www.taa-nj.org/TAANJ/07c08b845f5d348a35dc5e38958d1b0c.jpg",
    ],
    fbURL: "https://www.facebook.com/media/set/?set=a.334390785631677&type=3",
  },
  {
    id: "photo_4",
    title: "09/09/2023 UN for Taiwan",
    imagesURL: [
      "https://www.taa-nj.org/TAANJ/c7bee42dfcb1edb54dab018e8fa2335b.jpg",
      "https://www.taa-nj.org/TAANJ/32b27c9339fe8a667bf570e9eb866b8d.jpg",
      "https://www.taa-nj.org/TAANJ/334f0e4ce303603ef2312934cd003bf5.jpg",
      "https://www.taa-nj.org/TAANJ/07c08b845f5d348a35dc5e38958d1b0c.jpg",
    ],
    fbURL: "https://www.facebook.com/media/set/?set=a.334390785631677&type=3",
  },
];

function Photos() {
  const [numsOfPhotos, setNumsOfPhotos] = useState(3);

  const handleButtonClick = () => {
    setNumsOfPhotos((prevNum) => prevNum + 1);
  };

  const displayedPhotos = photos.slice(0, numsOfPhotos);

  return (
    <>
      <div className="mb-4">
        <h4 className="text-center text-3xl font-mono my-10 font-bold">
          Past Events & Photos
        </h4>
      </div>
      <div className="flex relative justify-center min-h-1/2 overflow-hidden">
        <div className="carousel w-full flex">
          {displayedPhotos.map((photo) => (
            <div
              key={photo.id}
              className="flex justify-center carousel-item w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-2/5 p-4"
            >
              <PhotoSlide photo={photo} />
            </div>
          ))}
        </div>
        {photos.length > numsOfPhotos && (
          <button
            className="w-10 h-10 bg-blue-500 rounded-full hover:bg-blue-600 text-white font-mono absolute bottom-0 right-0 m-8 min-h-1/2 overflow-hidden"
            onClick={handleButtonClick}
          >
            +
          </button>
        )}
      </div>
    </>
  );
}


export default Photos;

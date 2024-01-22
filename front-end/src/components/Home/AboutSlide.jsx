function AboutSlide({ ele }) {
  return (
    <div className="carousel-item relative w-full">
      <img src={`${ele.url}`} className="w-full sm:w-full object-contain" />
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="mb-4 text-center text-sm sm:text-md md:text-lg lg:text-xl xl:text-md text-yellow-200 font-mono bg-gray-400 p-3">
          {ele.content}
        </p>
      </div>
    </div>
  );
}

export default AboutSlide;

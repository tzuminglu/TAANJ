import { useEffect } from "react";

import useFetchData from "../../../hooks/useFetchData";
import UpdatePhotoCard from "./UpdatePhotoCard";

const photosURL = "/photos";

function UpdatePhotoPage() {
  const {
    mutate: fetchPhotos,
    isLoading: fetching,
    error: fetchingError,
    data: data,
  } = useFetchData({ url: photosURL });

  useEffect(() => {
    fetchPhotos();
  }, []);

  console.log(data);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-5">
        {!fetching &&
          data &&
          data.photos &&
          data.photos.map((photo) => (
            <UpdatePhotoCard key={photo._id} photo={photo} />
          ))}
      </div>
    </div>
  );
}

export default UpdatePhotoPage;

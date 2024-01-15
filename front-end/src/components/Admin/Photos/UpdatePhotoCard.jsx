import React from "react";

import noImage from "../../../assets/no-image.png";

import UpdateMemberForm from "../Members/UpdateMemberForm";

function UpdatePhotoCard({ photo }) {
  return (
    <div id={photo._id} className="card w-96 bg-base-100 shadow-xl">
      <div className="carousel carousel-center rounded-box">
        {photo && photo.imageLink
          ? photo.imageLink.map((link, index) => {
              return (
                <div className="carousel-item relative w-full" key={index}>
                  <img src={`${link}`} alt={`photo._id-image-${index}`} />
                  <p className="image-index absolute top-0 left-04 text-blue-600 bg-black p-1">
                    {index + 1}
                  </p>
                </div>
              );
            })
          : null}
      </div>
      <div className="card-body">
        <h2 className="card-title">{photo.name}</h2>
        <p>{photo.link}</p>
        <div className="card-actions justify-end">
          <div>
            <label htmlFor={`modal-${photo.name}`} className="btn">
              Update
            </label>
            <input
              type="checkbox"
              id={`modal-${photo.name}`}
              className="modal-toggle"
            />
            <div className="modal" role="dialog">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Update {photo.name}</h3>
                <p className="py-4">Click the button below to close</p>
                <div>
                  <UpdateMemberForm photo={photo} />
                </div>
                <div className="modal-action">
                  <label htmlFor={`modal-${photo.name}`} className="btn">
                    Close
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePhotoCard;

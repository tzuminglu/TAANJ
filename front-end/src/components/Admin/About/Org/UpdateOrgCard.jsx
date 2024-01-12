import React, { useState } from "react";

import noImage from "../../../../assets/no-image.png";

import UpdateOrgForm from "./UpdateOrgForm";

function UpdateOrgCard({ org }) {
  return (
      <div id={org._id} className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={org.imageURL ? org.imageURL : noImage} alt="image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{org.name}</h2>
          <p>{org.description}</p>
          <p>Website Address: {org.link1}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() =>
                document.getElementById(`modal-${org.name}`).showModal()
              }
            >
              Update
            </button>
            <div>
              <dialog id={`modal-${org.name}`} className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Update {org.name}</h3>
                  <p className="py-4">
                    Press ESC key or click the button below to close
                  </p>
                  <div>
                    <UpdateOrgForm org={org} />
                  </div>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
  );
}

export default UpdateOrgCard;

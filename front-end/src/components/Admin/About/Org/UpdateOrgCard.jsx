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
          <div>
            <label htmlFor={`modal-${org.name}`} className="btn">
              Update
            </label>
            <input
              type="checkbox"
              id={`modal-${org.name}`}
              className="modal-toggle"
            />
            <div className="modal" role="dialog">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Update {org.name}</h3>
                <p className="py-4">Click the button below to close</p>
                <div>
                  <UpdateOrgForm org={org} />
                </div>
                <div className="modal-action">
                  <label htmlFor={`modal-${org.name}`} className="btn">
                    Close!
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

export default UpdateOrgCard;

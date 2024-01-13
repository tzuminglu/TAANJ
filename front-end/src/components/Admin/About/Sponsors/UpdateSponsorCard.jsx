import React from "react";

import UpdateSponsorForm from "./UpdateSponsorForm";

function UpdateSponsorCard({ sponsor }) {
  return (
    <div id={sponsor._id} className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{sponsor.name}</h2>
        <p>{sponsor.phone}</p>
        <div className="card-actions justify-end">
          <div>
            <label htmlFor={`modal-${sponsor.name}`} className="btn">
              Update
            </label>
            <input
              type="checkbox"
              id={`modal-${sponsor.name}`}
              className="modal-toggle"
            />
            <div className="modal" role="dialog">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Update {sponsor.name}</h3>
                <p className="py-4">Click the button below to close</p>
                <div>
                  <UpdateSponsorForm sponsor={sponsor} />
                </div>
                <div className="modal-action">
                  <label htmlFor={`modal-${sponsor.name}`} className="btn">
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

export default UpdateSponsorCard;

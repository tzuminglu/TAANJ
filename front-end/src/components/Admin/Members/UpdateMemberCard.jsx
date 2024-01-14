import { useState } from "react";

import noImage from "../../../assets/no-image.png";

import UpdateMemberForm from "./UpdateMemberForm";

function UpdateMemberCard({ member }) {
  return (
    <div id={member._id} className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={member.imageURL ? member.imageURL : noImage} alt="image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{member.name}</h2>
        <p>{member.role}</p>
        <p>Contact: {member.contact}</p>
        <div className="card-actions justify-end">
          <div>
            <label htmlFor={`modal-${member.name}`} className="btn">
              Update
            </label>
            <input
              type="checkbox"
              id={`modal-${member.name}`}
              className="modal-toggle"
            />
            <div className="modal" role="dialog">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Update {member.name}</h3>
                <p className="py-4">Click the button below to close</p>
                <div>
                  <UpdateMemberForm member={member} />
                </div>
                <div className="modal-action">
                  <label htmlFor={`modal-${member.name}`} className="btn">
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

export default UpdateMemberCard;

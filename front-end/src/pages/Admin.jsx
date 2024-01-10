import React, { useState } from "react";

import CreateForm from "../components/Admin/UpcomingEvent/CreateForm";
import UpdateForm from "../components/Admin/UpcomingEvent/UpdateForm";

function Admin() {
  const [showUpcomingEventDropdown, setShowUpcomingEventDropdown] =
    useState(false);
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);
  const [showPastEventDropdown, setShowPastEventDropdown] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showFormType, setShowFormType] = useState(null);

  const toggleUpcomingChildDropdown = () => {
    setShowUpcomingEventDropdown(!showUpcomingEventDropdown);
  };
  const toggleMemberChildDropdown = () => {
    setShowMemberDropdown(!showMemberDropdown);
  };
  const togglePastChildDropdown = () => {
    setShowPastEventDropdown(!showPastEventDropdown);
  };
  const togglePhotosChildDropdown = () => {
    setShowPhotos(!showPhotos);
  };

  const showForm = (formType) => {
    setShowFormType(formType);
  };

  return (
    <div>
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="btn m-1">
          Hover
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li onClick={toggleUpcomingChildDropdown}>
            <a>Upcoming Event &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &gt;</a>
            {showUpcomingEventDropdown && (
              <ul className="ml-4 mt-2 p-2 shadow bg-base-100 rounded-box w-52">
                <li onClick={() => showForm("createUpcomingEvent")}>
                  <a>Add New Event</a>
                </li>
                <li onClick={() => showForm("updateUpcomingEvent")}>
                  <a>Update Event Information</a>
                </li>
              </ul>
            )}
          </li>
          <li onClick={toggleMemberChildDropdown}>
            <a>
              Members &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&gt;
            </a>
            {showMemberDropdown && (
              <ul className="ml-4 mt-2 p-2 shadow bg-base-100 rounded-box w-52">
                {/* <li onClick={() => showForm("createUpcomingEvent")}>
                  <a>Add New Member</a>
                </li>
                <li onClick={() => showForm("updateUpcomingEvent")}>
                  <a>Update Member</a>
                </li> */}
              </ul>
            )}
          </li>
          <li onClick={togglePastChildDropdown}>
            <a>
              Past Event &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &gt;
            </a>
            {showPastEventDropdown && (
              <ul className="ml-4 mt-2 p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a>Event 1</a>
                </li>
                <li>
                  <a>Event 2</a>
                </li>
              </ul>
            )}
          </li>
          <li onClick={togglePhotosChildDropdown}>
            <a>
              Photos &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &gt;
            </a>
            {showPhotos && (
              <ul className="ml-4 mt-2 p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a>Event 1</a>
                </li>
                <li>
                  <a>Event 2</a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      {showFormType === "createUpcomingEvent" && <CreateForm />}
      {showFormType === "updateUpcomingEvent" && <UpdateForm />}
    </div>
  );
}

export default Admin;

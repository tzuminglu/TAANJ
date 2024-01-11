import React, { useState } from "react";

import CreateForm from "../components/Admin/UpcomingEvent/CreateForm";
import UpdateForm from "../components/Admin/UpcomingEvent/UpdateForm";

function Admin() {
  //   const [showHomeDropdown, setShowHomeDropdown] = useState(false);
  //   const [showUpcomingEventDropdown, setShowUpcomingEventDropdown] =
  //     useState(false);
  //   const [showMemberDropdown, setShowMemberDropdown] = useState(false);
  //   const [showPastEventDropdown, setShowPastEventDropdown] = useState(false);
  //   const [showPhotos, setShowPhotos] = useState(false);
  //   const [showFormType, setShowFormType] = useState(null);

  //   const toggleHomeChildDropdown = () => {
  //     setShowHomeDropdown(!showHomeDropdown);
  //   };
  //   const toggleUpcomingChildDropdown = (e) => {
  //     e.stopPropagation();
  //     setShowUpcomingEventDropdown(!showUpcomingEventDropdown);
  //   };
  //   const togglePastChildDropdown = (e) => {
  //     e.stopPropagation();
  //     setShowPastEventDropdown(!showPastEventDropdown);
  //   };
  //   const togglePhotosChildDropdown = (e) => {
  //     e.stopPropagation();
  //     setShowPhotos(!showPhotos);
  //   };

  //   const toggleMemberChildDropdown = () => {
  //     setShowMemberDropdown(!showMemberDropdown);
  //   };

  //   const showForm = (formType) => {
  //     setShowFormType(formType);
  //   };
  const initialState = {
    homeDropdown: false,
    upcomingEventDropdown: false,
    memberDropdown: false,
    pastEventDropdown: false,
    photosDropdown: false,
    aboutDropdown:false,
    formType: null,
  };

  const [state, setState] = useState(initialState);

  const toggleDropdown = (dropdownName, e) => {
    e.stopPropagation();
    setState((prevState) => ({
      ...prevState,
      [dropdownName]: !prevState[dropdownName],
    }));
  };

  const showForm = (formType) => {
    setState({ ...initialState, formType });
  };

  return (
    <div>
      <div className="dropdown dropdown-hover">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-outline btn-info m-1"
        >
          Action
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-64"
        >
          <li onClick={(e) => toggleDropdown("homeDropdown", e)}>
            <a className="flex justify-between">
              Home
              <span>&gt;</span>
            </a>

            {state.homeDropdown && (
              <ul className="ml-4 mt-2 p-2 shadow bg-base-100 rounded-box w-48">
                <li onClick={(e) => toggleDropdown("upcomingEventDropdown", e)}>
                  <a className="flex justify-between">
                    Upcoming Event
                    <span>&gt;</span>
                  </a>
                  {state.upcomingEventDropdown && (
                    <ul className="ml-4 mt-2 p-2 shadow bg-base-100 rounded-box w-40">
                      <li onClick={() => showForm("createUpcomingEvent")}>
                        <a>Add New Event</a>
                      </li>
                      <li onClick={() => showForm("updateUpcomingEvent")}>
                        <a>Update Event Info.</a>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  onClick={(e) => {
                    toggleDropdown("pastEventDropdown", e);
                  }}
                >
                  <a className="flex justify-between">
                    Past Event
                    <span>&gt;</span>
                  </a>
                  {state.pastEventDropdown && (
                    <ul className="ml-4 mt-2 p-2 shadow bg-base-100 rounded-box w-40">
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
            )}
          </li>

          <li
            onClick={(e) => {
              toggleDropdown("aboutDropdown", e);
            }}
          >
            <a className="flex justify-between">
              About
              <span>&gt;</span>
            </a>
            {state.aboutDropdown && (
              <ul className="ml-4 mt-2 p-2 shadow bg-base-100 rounded-box w-48">
                {/* <li onClick={() => showForm("createUpcomingEvent")}>
                  <a>Add New Member</a>
                </li>
                <li onClick={() => showForm("updateUpcomingEvent")}>
                  <a>Update Member</a>
                </li> */}
              </ul>
            )}
          </li>
          <li
            onClick={(e) => {
              toggleDropdown("memberDropdown", e);
            }}
          >
            <a className="flex justify-between">
              Members
              <span>&gt;</span>
            </a>
            {state.memberDropdown && (
              <ul className="ml-4 mt-2 p-2 shadow bg-base-100 rounded-box w-48">
                {/* <li onClick={() => showForm("createUpcomingEvent")}>
                  <a>Add New Member</a>
                </li>
                <li onClick={() => showForm("updateUpcomingEvent")}>
                  <a>Update Member</a>
                </li> */}
              </ul>
            )}
          </li>
          <li
            onClick={(e) => {
              toggleDropdown("photosDropdown", e);
            }}
          >
            <a className="flex justify-between">
              Photos
              <span>&gt;</span>
            </a>
            {state.photosDropdown && (
              <ul className="ml-4 mt-2 p-2 shadow bg-base-100 rounded-box w-48">
                {/* <li onClick={() => showForm("createUpcomingEvent")}>
                  <a>Add New Member</a>
                </li>
                <li onClick={() => showForm("updateUpcomingEvent")}>
                  <a>Update Member</a>
                </li> */}
              </ul>
            )}
          </li>
        </ul>
      </div>
      {state.formType === "createUpcomingEvent" && <CreateForm />}
      {state.formType === "updateUpcomingEvent" && <UpdateForm />}
    </div>
  );
}

export default Admin;

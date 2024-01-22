import { useState } from "react";

import CreateForm from "../components/Admin/Home/UpcomingEvent/CreateForm";
import UpdateForm from "../components/Admin/Home/UpcomingEvent/UpdateForm";
import CreateOrgForm from "../components/Admin/About/Org/CreateOrgForm";
import UpdateOrgPage from "../components/Admin/About/Org/UpdateOrgPage";
import CreateSponsorForm from "../components/Admin/About/Sponsors/CreateSponsorForm";
import UpdateSponsorPage from "../components/Admin/About/Sponsors/UpdateSponsorPage";
import CreatePhotoForm from "../components/Admin/Photos/CreatePhotoForm";
import UpdatePhotoPage from "../components/Admin/Photos/UpdatePhotoPage";
import CreateMemberForm from "../components/Admin/Members/CreateMemberForm";
import UpdateMemberPage from "../components/Admin/Members/UpdateMemberPage";
import CreatePastForm from "../components/Admin/Home/PastEvent/CreatePastForm";
import UpdatePastForm from "../components/Admin/Home/PastEvent/UpdatePastForm";

function Admin() {
  const initialState = {
    homeDropdown: false,
    upcomingEventDropdown: false,
    memberDropdown: false,
    pastEventDropdown: false,
    photosDropdown: false,
    aboutDropdown: false,
    organizationDropdown: false,
    sponsorDropdown: false,
    formType: null,
    cardType: null,
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

  const showCard = (cardType) => {
    setState({ ...initialState, cardType });
  };

  const components = {
    createUpcomingEvent: <CreateForm />,
    updateUpcomingEvent: <UpdateForm />,
    createOrg: <CreateOrgForm />,
    createSponsor: <CreateSponsorForm />,
    createImageForm: <CreatePhotoForm />,
    createMemberForm: <CreateMemberForm />,
    updateOrg: <UpdateOrgPage />,
    updateSponsor: <UpdateSponsorPage />,
    updateMember: <UpdateMemberPage />,
    updatePhotoPage: <UpdatePhotoPage />,
    createPastEvent: <CreatePastForm />,
    updatePastEvent: <UpdatePastForm />,
  };

  const componentToRender =
    components[state.formType || state.cardType] || null;

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
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80"
        >
          <li onClick={(e) => toggleDropdown("homeDropdown", e)}>
            <a className="flex justify-between">
              Home
              <span>&gt;</span>
            </a>

            {state.homeDropdown && (
              <ul className="ml-4 mt-2 p-2 shadow bg-base-100 rounded-box w-72">
                <li onClick={(e) => toggleDropdown("upcomingEventDropdown", e)}>
                  <a className="flex justify-between">
                    Upcoming Event
                    <span>&gt;</span>
                  </a>
                  {state.upcomingEventDropdown && (
                    <ul className="ml-4 mt-2 p-2 shadow bg-base-100 rounded-box w-64">
                      <li onClick={() => showForm("createUpcomingEvent")}>
                        <a>Add New Event</a>
                      </li>
                      <li onClick={() => showForm("updateUpcomingEvent")}>
                        <a>Update/Remove Event Info.</a>
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
                    <ul className="ml-4 mt-2 p-2 shadow bg-base-100 rounded-box w-64">
                      <li onClick={() => showForm("createPastEvent")}>
                        <a>Add New Past Event</a>
                      </li>
                      <li onClick={() => showForm("updatePastEvent")}>
                        <a>Update/Remove Past Event</a>
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
              <ul>
                <li
                  onClick={(e) => {
                    toggleDropdown("organizationDropdown", e);
                  }}
                >
                  <a className="flex justify-between">
                    Organization
                    <span>&gt;</span>
                  </a>
                  {state.organizationDropdown && (
                    <ul className="ml-4 mt-2 p-2 shadow bg-base-100 rounded-box w-64">
                      <li onClick={() => showForm("createOrg")}>
                        <a>Add New Organization</a>
                      </li>
                      <li onClick={() => showCard("updateOrg")}>
                        <a>Update/Remove Organization</a>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  onClick={(e) => {
                    toggleDropdown("sponsorDropdown", e);
                  }}
                >
                  <a className="flex justify-between">
                    Sponsor
                    <span>&gt;</span>
                  </a>
                  {state.sponsorDropdown && (
                    <ul className="ml-4 mt-2 p-2 shadow bg-base-100 rounded-box w-64">
                      <li onClick={() => showForm("createSponsor")}>
                        <a>Add New Sponsor</a>
                      </li>
                      <li onClick={() => showCard("updateSponsor")}>
                        <a>Update/Remove Sponsor</a>
                      </li>
                    </ul>
                  )}
                </li>
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
              <ul className="ml-4 mt-2 p-2 shadow bg-base-100 rounded-box w-64">
                <li onClick={() => showForm("createMemberForm")}>
                  <a>Add A New Member</a>
                </li>
                <li onClick={() => showCard("updateMember")}>
                  <a>Update/Remove Member Info.</a>
                </li>
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
              <ul className="ml-4 mt-2 p-2 shadow bg-base-100 rounded-box w-64">
                <li onClick={() => showForm("createImageForm")}>
                  <a className="flex justify-between">Add New Photos</a>
                </li>
                {/* <li onClick={() => showCard("updatePhotoPage")}>
                  <a>Update/Remove Photos Info.</a>
                </li> */}
              </ul>
            )}
          </li>
        </ul>
      </div>
      {componentToRender}
    </div>
  );
}

export default Admin;

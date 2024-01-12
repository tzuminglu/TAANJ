import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import axiosClient from "../../../../axios/config";

const formURL = "/admin/about/sponsor/create";

function CreateSponsorForm() {
  const navigate = useNavigate();
  const initialState = {
    name: "",
    phone: "",
  };
  const [state, setState] = useState(initialState);
  const handleSubmit = async (e) => {
    e.preventDefault();

    let { error, ...newSponsor } = state; //excpet error element

    try {
      const response = await axiosClient({
        url: formURL,
        data: newSponsor,
        method: "POST",
      });

      if (response.status === 200) {
        alert("Sponsors created successfully!");
        resetForm();
        navigate("/About");
      } else {
        alert("Failed to create organization. Please try again.");
      }
    } catch (error) {
      console.error("Error creating organiztion:", error);
      alert("An error occurred while creating the sponsor. Please try again.");
    }
  };

  const resetForm = () => {
    setState(initialState);
  };

  return (
    <div className="flex items-center justify-center h-full bg-white">
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a New Sponsor
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This page is designed for creating new sponsor member that will be
              displayed on the About page.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="event-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Sponsor Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="sponsor-name"
                      id="sponsor-name"
                      value={state.name}
                      onChange={(e) => {
                        setState({ ...state, name: e.target.value });
                      }}
                      autoComplete="sponsor-name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Sponsor Name"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="event-description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone/Telephone Number
                </label>
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={state.phone}
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    onChange={(e) => {
                      setState({ ...state, phone: e.target.value });
                    }}
                    autoComplete="phone"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Phone or Telephone Number"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-3 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => {
              const confirmReset = window.confirm(
                "Are you sure you want to cancel? All entered information will be lost."
              );
              if (confirmReset) {
                resetForm();
                alert("Form reset successful!"); // Optional: Show a success alert
              }
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateSponsorForm;

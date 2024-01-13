import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ErrorText from "../../../General/ErrorText";

import axiosClient from "../../../../axios/config";

const formURL = "/admin/about/sponsor/update";
const deleteURL = "/admin/about/sponsor/delete";

function UpdateSponsorForm({ sponsor }) {
  const navigate = useNavigate();
  const [originalState, setOriginalState] = useState(sponsor);
  const [formState, setFormState] = useState(sponsor);
  const [error, setError] = useState("");

  useEffect(() => {
    setOriginalState(sponsor);
    setFormState(sponsor);
  }, [sponsor]);

  //   handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosClient({
        url: formURL,
        data: formState,
        method: "PATCH",
      });

      if (response.status === 200) {
        alert("The event has been successfully updated!");
        setOriginalState(formState); // Update original state after successful submission
        navigate("/about");
      } else {
        alert("Failed to update the sponsor. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while updating the sponsor. Please try again.");
    }
  };

  const handleDeleteClick = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this sponsor?"
    );

    if (isConfirmed) {
      await axiosClient({
        url: deleteURL,
        method: "DELETE",
        data: formState, // Use form state instead of sponsor directly
      })
        .then((res) => {
          if (res.status === 200) {
            alert("The sponsor has been successfully deleted!");
            navigate("/about");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const resetForm = () => {
    setFormState(originalState);
  };

  return (
    <div>
      <div className="flex items-center justify-center h-full bg-white">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="pb-5">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Update&nbsp;/&nbsp;Remove Current sponsor
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This page is designed for update sponsor information that has
                been displayed on the About page and also support remove
                sponsor.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="sponsor-name"
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
                        value={formState ? formState.name : ""}
                        onChange={(e) => {
                          setFormState((prevPost) => ({
                            ...prevPost,
                            name: e.target.value,
                          }));
                        }}
                        autoComplete="sponsor-name"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Sponsor Name"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="sponsor-phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone/Telephone Number
                  </label>
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="tel"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      name="sponsor-name"
                      id="sponsor-name"
                      value={formState ? formState.phone : ""}
                      onChange={(e) => {
                        setFormState((prevPost) => ({
                          ...prevPost,
                          phone: e.target.value,
                        }));
                      }}
                      autoComplete="sponsor-name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Sponsor Name"
                      required
                    />
                  </div>
                  <small className="text-gray-500">
                    Format: xxx-xxx-xxxx (e.g., 123-456-7890)
                  </small>
                </div>
                {error && <ErrorText>{error}</ErrorText>}
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
              Submit
            </button>
            <button
              onClick={handleDeleteClick}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateSponsorForm;

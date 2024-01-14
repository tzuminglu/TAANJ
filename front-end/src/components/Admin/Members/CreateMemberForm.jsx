import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ErrorText from "../../General/ErrorText";
import useUploadImage from "../../../hooks/useUploadImage";

import axiosClient from "../../../axios/config";

import { PhotoIcon } from "@heroicons/react/24/solid";

const validImageTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const imageURL = "/admin/members/imageupload";
const formURL = "/admin/members";

function CreateMemberForm() {
  const navigate = useNavigate();
  const initialState = {
    name: "",
    role: "",
    imageName: "",
    imageURL: undefined,
    contact: "",
    error: "",
  };
  const [state, setState] = useState(initialState);

  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
    imageURL: uploadImageURL,
  } = useUploadImage({ url: imageURL });

  // reset all information in the form
  const resetForm = () => {
    setState(initialState);
  };

  //   handle upload image
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!validImageTypes.find((type) => type === file.type)) {
      setState({ ...state, error: "File must be JPG/PNG/GIF format" });
    } else if (file.size > 1000000) {
      alert("Image size is greater than 10MB");
    } else {
      alert("Successfully upload image!");
      const form = new FormData();
      form.append("image", file);
      await uploadImage(form);
      setState({
        ...state,
        error: "",
        imageName: file.name,
      });
    }
  };

  //   handle submit button
  const handleSubmit = async (e) => {
    e.preventDefault();

    let { error, ...newMember } = state; //excpet error element
    newMember = { ...newMember, imageURL: uploadImageURL };

    try {
      const response = await axiosClient({
        url: formURL,
        data: newMember,
        method: "POST",
      });

      if (response.status === 200) {
        alert("Member created successfully!");
        resetForm();
        navigate("/members");
      } else {
        alert("Failed to create member. Please try again.");
      }
    } catch (error) {
      console.error("Error creating member:", error);
      alert("An error occurred while creating the member. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-white">
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a New Member
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This page is designed for creating new member that will be
              displayed on the Members page.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="member-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Member&apos;s Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="member-name"
                      id="member-name"
                      value={state.name}
                      onChange={(e) => {
                        setState({ ...state, name: e.target.value });
                      }}
                      autoComplete="member-name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Member Name"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="member-role"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Member&apos;s Role
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="member-role"
                      id="member-role"
                      value={state.role}
                      onChange={(e) => {
                        setState({ ...state, role: e.target.value });
                      }}
                      autoComplete="member-role"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Member Name"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="member-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Member&apos;s Photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleUpload}
                        />
                      </label>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, JPEG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                {state.imageName && (
                  <p className="text-md mt-3 leading-5 text-gray-600">
                    {state.imageName}
                  </p>
                )}
                {state.error && <ErrorText>{state.error}</ErrorText>}
                {uploadError && <ErrorText>{uploadError}</ErrorText>}
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contact Infornation
                </label>
                <p className="mt-1 text-sm leading-6 text-gray-600"></p>
                <div className="mt-2">
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    autoComplete="contact"
                    value={state.contact}
                    onChange={(e) => {
                      setState({ ...state, contact: e.target.value });
                    }}
                    className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder=" Provide member's contact information"
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

export default CreateMemberForm;

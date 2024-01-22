import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import ErrorText from "../../General/ErrorText";

import axiosClient from "../../../axios/config.js";

import { PhotoIcon } from "@heroicons/react/24/solid";

const validImageTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
const formURL = "/admin/photos";
const imagesURL = "/admin/photos/photoUpload";

function CreatePhotoForm() {
  const navigate = useNavigate();
  const initialState = {
    name: "",
    imageLink: [],
    link: "",
    error: "",
  };
  const [state, setState] = useState(initialState);
  const [images, setImages] = useState(undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, ...newData } = state;

    try {
      const response = await axiosClient({
        url: formURL,
        data: newData,
        method: "POST",
      });

      if (response.status === 200) {
        alert("Past event and photos created successfully!");
        // navigate("/photos");
      } else {
        alert("Failed to add this event and photos. Please try again.");
      }
    } catch (error) {
      console.error("Error creating photos:", error);
      alert(
        "Sorry, an error occurred while adding this event and photo. Please try again."
      );
    }
  };

  const handleSelect = async (e) => {
    const selectedFiles = e.target.files;
    setImages(selectedFiles);
  };

  const handleImagesUpload = async () => {
    try {
      const areAllImagesValid = Array.from(images).every((image) =>
        validImageTypes.includes(image.type)
      );
      if (!areAllImagesValid) alert(`Image format is prohibited`);
      else {
        const form = new FormData();
        Array.from(images).forEach((file) => {
          form.append(`images`, file);
        });

        const response = await axiosClient({
          url: imagesURL,
          data: form,
          method: "POST",
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status === 200) {
          setState({ ...state, imageLink: response.data.urls });
          alert("Photos uploaded successfully!");
        } else {
          alert("Failed to uploaded photos. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error creating photos:", error);
      alert(
        "An error occurred while uploading these photos. Please try again."
      );
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
              Create a New Photos
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This page is intended for creating new photos from past events,
              which will be showcased on the Photos page.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="event-photo-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photos of The Event Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="event-photo-name"
                      id="event-photo-name"
                      value={state.name}
                      onChange={(e) => {
                        setState({ ...state, name: e.target.value });
                      }}
                      autoComplete="event-photo-name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Event Name"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photos of The Event
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
                        <span>Select files</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          multiple="multiple"
                          onChange={handleSelect}
                        />
                      </label>
                    </div>
                    <p className="text-xs leading-5 text-left text-gray-600">
                      PNG, JPG, JPEG, GIF up to 10MB
                      <br />
                      <strong>Accept a maximum of 10 photos for upload</strong>
                      <br />
                      (Press the Control button to select multiple images in
                      your folder)
                    </p>
                  </div>
                </div>

                {images && (
                  <div>
                    <p className="text-md mt-3 leading-5 text-gray-600">
                      Uploaded Image:
                    </p>
                    <ul>
                      {Array.from(images).map((image) => (
                        <li key={image.lastModified}>{image.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  type="button"
                  className="btn btn-info btn-sm text-sm font-semibold text-gray-900 mt-2"
                  onClick={handleImagesUpload}
                >
                  Upload Images
                </button>
                <p className="text-xs leading-5 text-left text-gray-600">
                  <strong>
                    Ensure that the images are uploaded before submitting the
                    form.
                  </strong>
                </p>

                {state.error && <ErrorText>{state.error}</ErrorText>}
                {/* {uploadError && <ErrorText>{uploadError}</ErrorText>} */}
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="link"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Event Website URL
                </label>
                <p className="mt-1 text-sm leading-6 text-gray-600"></p>
                <div className="mt-2">
                  <input
                    id="link"
                    name="link"
                    type="text"
                    autoComplete="link"
                    value={state.link}
                    onChange={(e) => {
                      setState({ ...state, link: e.target.value });
                    }}
                    className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder=" Provide website address"
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

export default CreatePhotoForm;

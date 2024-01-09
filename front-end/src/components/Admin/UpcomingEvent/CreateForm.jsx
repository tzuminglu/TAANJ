import React, { useState, useEffect } from "react";

import ErrorText from "../../General/ErrorText";
import useUploadImage from "../../../hooks/useUploadImage";

import dayjs from "dayjs";
import axiosClient from "../../../axios/config";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const validImageTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const imageURL = "/admin/upcomingevent/imageupload";
const formURL = "/admin/upcomingevent/create";

function CreateForm() {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startValue, setStartValue] = useState(dayjs(new Date()));
  const [endValue, setEndValue] = useState(dayjs(new Date()));
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(undefined);
  const [isUploadCompleted, setIsUploadCompleted] = useState(false);

  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
    imageURL: uploadImageURL,
  } = useUploadImage({ url: imageURL });

  // reset all information in the form
  const resetForm = () => {
    setName("");
    setDescription("");
    setStartValue(dayjs(new Date()));
    setEndValue(dayjs(new Date()));
    setLocation("");
    setImage(undefined);
  };

  //   handle upload image
  const handleUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!validImageTypes.find((type) => type === file.type)) {
      setError("File must be JPG/PNG/GIF format");
    } else {
      setImage(file);
      setError("");
    }
  };

  //   handle submit button
  const handleSubmit = async (e) => {
    e.preventDefault();

    // upload image first and get url
    const form = new FormData();
    form.append("image", image);
    await uploadImage(form);

    if (!isUploadCompleted) {
        alert("Image is still uploading. Please wait.");
        return;
      }  

    const eventData = {
      name,
      description,
      startValue,
      endValue,
      location,
      uploadImageURL,
    };

    try {
      const response = await axiosClient({
        url: formURL,
        data: eventData,
        method: "POST",
      });

      if (response.status === 200) {
        alert("Event created successfully!");
        resetForm();
      } else {
        alert("Failed to create event. Please try again.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("An error occurred while creating the event. Please try again.");
    }
  };

  // let the form submit after the image url generated
  useEffect(() => {
    if (uploadImageURL) {
      setIsUploadCompleted(true);
    }
  }, [uploadImageURL]);

  return (
    <div className="flex items-center justify-center h-full bg-white">
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create New Upcoming Event
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This page is designed for creating new events that will be
              displayed on the Home page.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="event-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Event Name*
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="event-name"
                      id="event-name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      autoComplete="event-name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Event Name"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="event-description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Event Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="event-description"
                    name="event-description"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    rows={10}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={description}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Describe the event.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover Photo
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
                {image && (
                  <p className="text-md mt-3 leading-5 text-gray-600">
                    {image.name}
                  </p>
                )}
                {error && <ErrorText>{error}</ErrorText>}
                {uploadError && <ErrorText>{uploadError}</ErrorText>}
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Some information about the event like time and location.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="start-date-time"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Start Date and Time
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DateTimePicker", "DateTimePicker"]}
                  >
                    <DateTimePicker
                      label="Start Date and Time"
                      value={startValue}
                      onChange={(newValue) =>
                        setStartValue(
                          dayjs(newValue["$d"]).format("YYYY-MM-DDTHH:mm:ss")
                        )
                      }
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="end-date-time"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  End Date and Time
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DateTimePicker", "DateTimePicker"]}
                  >
                    <DateTimePicker
                      label="End Date and Time"
                      value={endValue}
                      onChange={(newValue) =>
                        setEndValue(
                          dayjs(newValue["$d"]).format("YYYY-MM-DDTHH:mm:ss")
                        )
                      }
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Location
                </label>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Address or Google map link
                </p>
                <div className="mt-2">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    autoComplete="location"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
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

export default CreateForm;

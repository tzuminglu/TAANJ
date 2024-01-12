import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ErrorText from "../../General/ErrorText";
import useUploadImage from "../../../hooks/useUploadImage";

import dayjs from "dayjs";
import axiosClient from "../../../axios/config";

import { PhotoIcon } from "@heroicons/react/24/solid";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const validImageTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const imageURL = "/admin/upcomingevent/imageupload";
const formURL = "/admin/upcomingevent/update";
const deleteURL = "/admin/upcomingevent/delete";
const dataURL = "/upcomingevent";

function UpdateForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [post, setPost] = useState({
    name: "",
    description: "",
    startValue: dayjs(new Date()),
    endValue: dayjs(new Date()),
    location: "",
    link1: "",
    link2: "",
  });
  const [image, setImage] = useState(undefined);

  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
    imageURL: uploadImageURL,
  } = useUploadImage({ url: imageURL });

  // reset all information in the form
  const resetForm = () => {
    setPost({
      name: "",
      description: "",
      startValue: dayjs(new Date()),
      endValue: dayjs(new Date()),
      location: "",
      link1: "",
      link2: "",
    });
    setImage(undefined);
  };

  //   handle upload image
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!validImageTypes.find((type) => type === file.type)) {
      setError("File must be JPG/PNG/GIF format");
    } else if (file.size > 1000000) {
      alert("Image size is greater than 10MB");
    } else if (!file) {
      return;
    } else {
      setImage(file);
      const form = new FormData();
      form.append("image", file);
      await uploadImage(form);
      setError("");
    }
  };

  //   handle submit button
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, startValue, endValue, location, link1, link2 } =
      post;

    const eventData = {
      name,
      description,
      startValue,
      endValue,
      location,
      uploadImageURL,
      link1,
      link2,
    };

    try {
      const response = await axiosClient({
        url: formURL,
        data: eventData,
        method: "PATCH",
      });

      if (response.status === 200) {
        alert("The event has been successfully updated!");
        resetForm();
        navigate("/");
      } else {
        alert("Failed to create event. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while creating the event. Please try again.");
    }
  };

  const handleDeleteClick = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (isConfirmed) {
      await axiosClient({
        url: deleteURL,
        method: "DELETE",
      })
        .then((res) => {
          if (res.status === 200) {
            alert("The event has been successfully deleted!");
            navigate("/");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let res = await axiosClient({ url: dataURL, method: "GET" });
      setPost(res.data.post);
    };

    fetchData();
  }, []);

  return (
    <>
      {post ? (
        <div className="flex items-center justify-center h-full bg-white">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Update&nbsp;/&nbsp;Remove Current Upcoming Event
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  This page is designed for update upcoming event information
                  that has been displayed on the Home page and also support
                  remove event.
                </p>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="event-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Event Name
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="event-name"
                          id="event-name"
                          value={post ? post.name : ""}
                          onChange={(e) => {
                            setPost((prevPost) => ({
                              ...prevPost,
                              name: e.target.value,
                            }));
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
                          setPost((prevPost) => ({
                            ...prevPost,
                            description: e.target.value,
                          }));
                        }}
                        wrap="hard"
                        rows={10}
                        className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={post ? post.description : ""}
                        placeholder=" Describe the event"
                      />
                    </div>
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
                  Please indicate the event&apos;s start and end times, its
                  location, and any associated Facebook or other links.
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
                          value={dayjs(post.startValue)}
                          onChange={(newValue) =>
                            setPost({ ...post, startValue: dayjs(newValue) })
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
                          value={dayjs(post.endValue)}
                          onChange={(newValue) =>
                            setPost({ ...post, endValue: dayjs(newValue) })
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
                    <p className="mt-1 text-sm leading-6 text-gray-600"></p>
                    <div className="mt-2">
                      <input
                        id="location"
                        name="location"
                        type="text"
                        autoComplete="location"
                        value={post ? post.location : ""}
                        onChange={(e) => {
                          setPost((prevPost) => ({
                            ...prevPost,
                            location: e.target.value,
                          }));
                        }}
                        className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder=" Address or Google map link"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="link1"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Link 1
                    </label>
                    <p className="mt-1 text-sm leading-6 text-gray-600"></p>
                    <div className="mt-2">
                      <input
                        id="link1"
                        name="link1"
                        type="text"
                        autoComplete="link1"
                        value={post ? post.link1 : ""}
                        onChange={(e) => {
                          setPost((prevPost) => ({
                            ...prevPost,
                            link1: e.target.value,
                          }));
                        }}
                        className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder=" Provide website address"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="link2"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Link 2
                    </label>
                    <p className="mt-1 text-sm leading-6 text-gray-600"></p>
                    <div className="mt-2">
                      <input
                        id="link2"
                        name="link2"
                        type="text"
                        autoComplete="link2"
                        value={post ? post.link2 : ""}
                        onChange={(e) => {
                          setPost((prevPost) => ({
                            ...prevPost,
                            link2: e.target.value,
                          }));
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
              <button
                onClick={handleDeleteClick}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      ) : (
        <h1 className="text-center text-xl font-mono text-red-600">
          Please create a post before attempting to update.
        </h1>
      )}
    </>
  );
}

export default UpdateForm;

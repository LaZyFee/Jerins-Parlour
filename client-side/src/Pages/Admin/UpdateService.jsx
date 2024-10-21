/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const placeholderImage = "https://via.placeholder.com/300x200?text=No+Image";

function UpdateService() {
  const location = useLocation();
  const { service } = location.state || {};
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);

  const serviceId = service._id;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);

    // If the user has selected an image and has not opted to remove it, append the image
    if (selectedImage && !removeImage) {
      formData.append("image", selectedImage);
    }

    // Append flag to indicate if the image should be removed
    formData.append("removeImage", removeImage);

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/updateService/${serviceId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        toast.success("Service updated successfully");
        reset();
        navigate("/admin/dashboard/manage-services");
      })
      .catch((err) => {
        toast.error("Failed to update service");
        console.error(err);
      });
  };

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleRemoveImage = () => {
    setRemoveImage((prev) => !prev); // Toggle the image removal flag
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold text-center my-4">Update Service</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row gap-5 bg-white p-5 lg:p-10 rounded-lg min-h-72 lg:mx-10">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <label htmlFor="name" className="text-gray-700 font-semibold">
              Current Image
            </label>
            <img
              src={
                service.image && !removeImage
                  ? `${import.meta.env.VITE_BACKEND_URL}/${service.image}`
                  : placeholderImage
              }
              className="w-40 h-32 object-cover object-center"
              alt="{service.name image}"
            />

            <label htmlFor="name" className="text-gray-700 font-semibold">
              Service Name
            </label>
            <input
              id="name"
              type="text"
              className="input input-bordered w-full bg-white text-black"
              defaultValue={service.name}
              {...register("name", { required: true })}
            />

            <label htmlFor="price" className="text-gray-700 font-semibold">
              Service Price
            </label>
            <input
              id="price"
              type="number"
              className="input input-bordered w-full bg-white text-black"
              defaultValue={service.price}
              {...register("price", { required: true })}
            />

            <label
              htmlFor="description"
              className="text-gray-700 font-semibold"
            >
              Service Description
            </label>
            <textarea
              id="description"
              className="textarea textarea-bordered w-full min-h-[100px] max-h-[200px] resize-none bg-white"
              style={{ whiteSpace: "pre-wrap" }}
              defaultValue={service.description}
              {...register("description", { required: true })}
            ></textarea>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <label className="text-gray-700 font-semibold">Update Image</label>
            {/* Custom file upload button */}
            <label
              htmlFor="image"
              className="btn bg-[#F63E7B] text-white lg:w-1/2 flex items-center justify-center gap-2 cursor-pointer"
            >
              <IoCloudUploadOutline /> Upload Image
            </label>

            {/* Hidden file input */}
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleFileChange}
              disabled={removeImage} // Disable if image is set to be removed
            />

            {/* Remove image option */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={removeImage}
                onChange={handleRemoveImage}
              />
              <span className="text-gray-700 font-semibold">Remove Image</span>
            </label>

            <div>
              <button
                type="submit"
                className="btn bg-[#F63E7B] px-8 py-2 text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateService;

import { useForm } from "react-hook-form";
import { IoCloudUploadOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function AddService() {
  const {
    register,
    handleSubmit,
    setValue,
    reset, // Add reset to clear the form
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    // Show SweetAlert success message
    Swal.fire({
      icon: "success",
      title: "Service added successfully!",
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      position: "top-right",
    });

    // Clear the form fields after successful submit
    reset();
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Add Service</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="my-4">
        <div className="flex flex-col lg:flex-row gap-5 bg-white p-5 lg:p-10 rounded-lg min-h-72 lg:mx-10">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <label htmlFor="name" className="text-gray-700 font-semibold">
              Service Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Service Name"
              {...register("name", { required: "Service name is required" })}
              className="input input-bordered w-full bg-white text-black"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}

            <label htmlFor="price" className="text-gray-700 font-semibold">
              Service Price
            </label>
            <input
              id="price"
              type="number" // Input type set to number
              placeholder="Service Price"
              {...register("price", {
                required: "Service price is required",
                min: {
                  value: 0,
                  message: "Price must be a positive number",
                },
              })}
              className="input input-bordered w-full bg-white text-black"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}

            <label
              htmlFor="description"
              className="text-gray-700 font-semibold"
            >
              Service Description
            </label>
            <textarea
              id="description"
              placeholder="Enter description"
              className="textarea textarea-bordered w-full min-h-[100px] max-h-[200px] resize-none bg-white"
              style={{ whiteSpace: "pre-wrap" }}
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <label className="text-gray-700 font-semibold">Service Image</label>

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
              {...register("image", { required: "Image is required" })}
            />

            {/* Error message */}
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end lg:mx-10 mt-4">
          <button
            type="submit"
            className="btn bg-[#F63E7B] px-8 py-2 text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default AddService;

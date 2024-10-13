import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Store/AuthStore";

function CustomerReviews() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [review, setReview] = useState({});

  const { user } = useAuth(); // Assuming user data is available here

  const onSubmit = (data) => {
    console.log("review:", data);
    setReview(data?.description);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Drop a Review for Us</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-screen lg:w-1/2 mx-auto flex flex-col gap-2 my-4"
      >
        <input
          type="text"
          placeholder={user?.name ? user.name : "Enter your name"}
          {...register("name", { required: true })}
          className="input input-bordered bg-white text-black"
          defaultValue={user?.name || ""}
          readOnly={!!user?.name}
        />
        {errors.name && <p className="text-red-500">Name is required</p>}

        <input
          type="email"
          placeholder={user?.email ? user.email : "Enter your email"}
          {...register("email", { required: true })}
          className="input input-bordered bg-white text-black"
          defaultValue={user?.email || ""}
          readOnly={!!user?.email}
        />
        {errors.email && <p className="text-red-500">Email is required</p>}

        <textarea
          placeholder="Enter your review"
          {...register("description", { required: true })}
          className="textarea textarea-bordered bg-white text-black"
        />
        {errors.description && (
          <p className="text-red-500">Description is required</p>
        )}
        <div>
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

export default CustomerReviews;

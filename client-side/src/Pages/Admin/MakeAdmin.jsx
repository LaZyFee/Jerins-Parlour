import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function MakeAdmin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    // Show SweetAlert success message
    Swal.fire({
      icon: "success",
      title: "Admin added successfully!",
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      position: "top",
    });

    // Clear the form fields after successful submit
    reset();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Make Admin</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto lg:mx-10 rounded-xl my-4 bg-white p-2 lg:p-7 max-h-screen h-[200px] shadow-xl"
      >
        {/* Flex container for email and button */}
        <label htmlFor="email" className="text-lg font-semibold">
          Email
        </label>
        <div className="flex items-center gap-2 mx-auto">
          <input
            id="email"
            className="input input-bordered bg-white lg:w-2/3"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <button type="submit" className="btn bg-[#F63E7B] text-white">
            Submit
          </button>
        </div>

        {errors.email && (
          <p className="text-red-500 text-sm">Email is required</p>
        )}
      </form>
    </div>
  );
}

export default MakeAdmin;

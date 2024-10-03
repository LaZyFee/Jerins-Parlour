import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Store/AuthStore";
import PrimaryButton from "../../Components/PrimaryButton";
import { toast } from "react-hot-toast";

function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const handleLogin = async (data) => {
    const { email, password } = data;

    try {
      await login(email, password);
      toast.success("Login successfully");
      navigate("/");
    } catch (error) {
      setLoginError(error.message || "Error logging in");
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Jerin&apos;s Parlour</title>
      </Helmet>

      <div className="hero min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center">
            <img
              src="public/assets/logo.png"
              alt="signup"
              className="w-1/2 mx-auto"
            />
          </div>
          <div className="card w-full max-w-sm shrink-0">
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="form-control">
                <input
                  type="text"
                  {...register("email", {
                    required: "Email Address is required",
                  })}
                  placeholder="Email"
                  className="w-full border-b border-gray-400 bg-transparent p-2 placeholder-gray-600"
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="form-control">
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Password"
                  className="w-full border-b border-gray-400 bg-transparent p-2 placeholder-gray-600"
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
              </div>

              <label className="label">
                {" "}
                <Link className="label-text" to="/forgot-password">
                  Forget Password?
                </Link>
              </label>

              {loginError && <p className="text-red-600">{loginError}</p>}

              <div className="form-control my-3.5">
                <PrimaryButton
                  className="w-full"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in" : "Login"}
                </PrimaryButton>
              </div>
            </form>

            <p>
              New to Expense Tracker?{" "}
              <Link className="text-[#F63E7B]" to="/signup">
                Create new Account
              </Link>
            </p>
            <div className="divider">OR</div>
            <div className="btn btn-outline btn-info rounded-xl text-xl flex items-center justify-center">
              <img
                src="public/assets/icons/Group 573.png"
                alt="google icon"
                className="w-5 mr-2"
              />
              <span className="flex-1 text-center">Continue with Google</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

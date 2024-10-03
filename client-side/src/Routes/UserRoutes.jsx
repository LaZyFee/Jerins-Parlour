import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import NotFound from "../Pages/Shared/Notfound";
import Home from "../Pages/Home/Home";
import Signup from "../Pages/Authentication/Signup";
import Login from "../Pages/Authentication/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [{ path: "/", element: <Home /> }],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  // { path: "/forgot-password", element: <ForgetPassword /> },
  // { path: "/reset-password", element: <ResetPassword /> },
  { path: "*", element: <NotFound /> },
]);

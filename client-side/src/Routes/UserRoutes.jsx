import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import NotFound from "../Pages/Shared/Notfound";
import Home from "../Pages/Outlets/Home";
import Signup from "../Pages/Authentication/Signup";
import Login from "../Pages/Authentication/Login";
import OurPortfolio from "../Pages/Outlets/OurPortfolio";
import OurTeam from "../Pages/Outlets/OurTeam";
import ContactUs from "../Pages/Outlets/ContactUs";
import CustomerLayout from "../Layouts/CustomerLayout";
import Booking from "../Pages/Customer/Booking";
import BookingList from "../Pages/Customer/BookingList";
import CustomerReviews from "../Pages/Customer/CustomerReviews";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/portfolio", element: <OurPortfolio /> },
      { path: "/team", element: <OurTeam /> },
      { path: "/contact", element: <ContactUs /> },
      {
        path: "/booking",
        element: <CustomerLayout />,
        children: [
          {
            path: "",
            element: <Booking />,
          },
          {
            path: "booking-list",
            element: <BookingList />,
          },
          {
            path: "review",
            element: <CustomerReviews />,
          },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "*", element: <NotFound /> },
]);

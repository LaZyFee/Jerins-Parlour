import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Placeholder image for services with no image
  const placeholderImage = "https://via.placeholder.com/300x200?text=No+Image";

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/getAllServices`)
      .then((response) => {
        setServices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center min-h-screen">
        <div className="flex w-52 flex-col gap-4 items-center justify-center">
          <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="skeleton h-32 w-full"></div>
          <p className="text-xl font-bold text-info">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-5 bg-white">
      <h1 className="text-3xl font-bold text-center">All Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto lg:p-12">
        {services.map((service) => (
          <div
            key={service._id}
            className="text-center transition-transform duration-300 ease-in-out transform hover:shadow-2xl hover:scale-105"
          >
            <div className="card bg-base-100 w-auto shadow-xl">
              <figure className="h-48">
                <img
                  src={
                    service.image
                      ? `${import.meta.env.VITE_BACKEND_URL}/${service.image}`
                      : placeholderImage
                  }
                  alt={service.name || "Service Image"}
                  className="max-w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{service.name}</h2>
                <p>{service.description}</p>
                <div className="card-actions justify-between items-center my-2">
                  <div className="text-xl font-bold">${service.price}</div>
                  <Link
                    to="/booking"
                    state={{ service }} // Pass service data to the booking page
                    className="bg-pink-600 text-white p-2 rounded-md btn"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;

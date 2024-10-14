import { Link } from "react-router-dom";
import PrimaryButton from "../../../Components/PrimaryButton";
import services from "../../../fakeDB/Services";

function ServiceSection() {
  return (
    <div className="py-5 bg-white">
      <h1 className="text-3xl my-5 font-bold text-center">
        Our Awesome <span className="text-[#F63E7B]">Services</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto lg:p-12">
        {services.map((service) => (
          <div
            key={service.id}
            className="border p-6 rounded-lg text-center transition-transform duration-300 ease-in-out transform hover:shadow-2xl hover:scale-105"
          >
            <div className="card bg-base-100 w-auto shadow-xl">
              <figure>
                <img src={service.icon} alt={service.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {service.title}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{service.description}</p>
                <div className="card-actions justify-between items-center my-2">
                  <div className="  text-xl font-bold">{service.price}</div>
                  <Link
                    to="/booking"
                    state={{ service }} // Use state directly as a prop
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

      <div className="grid place-items-center my-4">
        <PrimaryButton>Explore More</PrimaryButton>
      </div>
    </div>
  );
}

export default ServiceSection;

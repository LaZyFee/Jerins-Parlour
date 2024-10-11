import PrimaryButton from "../../Components/PrimaryButton";
import services from "../../fakeDB/Services";
import testimonials from "../../fakeDB/TestomonialData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import HeroImage1 from "../../assets/images/hero1.png";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 p-12 shadow-xl lg:flex lg:flex-row-reverse ">
        <img src={HeroImage1} className="w-full max-h-screen" alt="Hero" />
        <div className="w-full flex flex-col justify-center items-start p-6">
          <h1 className="text-5xl font-bold">
            Beauty Salon <br />
            For Every Women
          </h1>
          <p className="py-6">
            Lorem ipsum dolor sit amet, consectetur <br />
            adipiscing elit. Purus commodo ipsum duis <br />
            laoreet maecenas. Feugiat
          </p>
          <PrimaryButton>Get an Appointment</PrimaryButton>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-5 bg-white">
        <h1 className="text-3xl my-5 font-bold text-center">
          Our Awesome <span className="text-[#F63E7B]">Services</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-12 ">
          {services.map((service) => (
            <div
              key={service.id}
              className="border p-6 rounded-lg text-center transition-transform duration-300 ease-in-out transform hover:shadow-2xl hover:scale-105"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h2 className="text-lg font-bold">{service.title}</h2>
              <p className="text-xl text-pink-600">{service.price}</p>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="grid place-items-center">
          <PrimaryButton>Explore More</PrimaryButton>
        </div>
      </div>
      {/* Secondary Hero Section */}
      <div className="flex flex-col lg:flex-row p-8 lg:gap-12 shadow-xl">
        <div className="flex-1">
          <img
            src="public/assets/images/engin-akyurt-g-m8EDc4X6Q-unsplash 1.png"
            alt="Professional Treatment"
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
        <div className="flex-1 lg:pl-8">
          <h2 className="text-4xl font-bold mb-4">
            Let us handle your skin{" "}
            <span className="text-primary">Professionally</span>.
          </h2>
          <p className="mb-6">
            With well-written codes, we build amazing apps for all platforms,
            mobile and web apps in general. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Purus commodo ipsum.
          </p>
          <div className="flex justify-around">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-primary">500+</h3>
              <p className="text-gray-500">Happy Customer</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-primary">16+</h3>
              <p className="text-gray-500">Total Service</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className=" mx-auto p-4 shadow-md py-10 bg-white">
        <h2 className="text-center text-3xl font-bold mb-8">Testimonials</h2>

        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="w-full"
          breakpoints={{
            // When the screen is larger than 1024px (large screen)
            1024: {
              slidesPerView: 3, // Show 3 cards
              spaceBetween: 30,
            },
            // When the screen is smaller than 1024px (small screen)
            640: {
              slidesPerView: 1, // Show 1 card
              spaceBetween: 20,
            },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="card  shadow-xl p-8 max-w-lg mx-auto">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="rounded-full w-16 h-16 mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mb-4">{testimonial.text}</p>
                <div className="flex">
                  {Array(Math.floor(testimonial.rating))
                    .fill(0)
                    .map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-yellow-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.998 2.25c-.265 0-.53.11-.725.327l-2.964 3.03-3.506.707c-.399.08-.6.56-.425.913l2.513 4.925-.627 3.697c-.084.497.216.948.696 1.086.267.078.544.078.812 0l3.191-1.537 3.19 1.537c.268.078.545.078.813 0 .48-.138.78-.589.696-1.086l-.627-3.697 2.514-4.925c.175-.353-.026-.833-.425-.913l-3.506-.707-2.964-3.03c-.195-.217-.46-.327-.725-.327z"
                        />
                      </svg>
                    ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CTA Section */}

      <div className="hero">
        <div className="hero-content flex-col gap-10 ">
          <div className="text-center ">
            <h1 className="text-2xl font-bold">
              Let us handle your <br /> project, professionally.
            </h1>
          </div>
          <div className="card w-full">
            <form className="card-body grid grid-cols-2">
              <div className="form-control ">
                <label className="label"></label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control ">
                <label className="label"></label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label"></label>
                <input
                  type="email"
                  placeholder="Email Adress"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label"></label>
                <input
                  type="number"
                  placeholder="Phone Number"
                  className="input input-bordered"
                  required
                />
              </div>
            </form>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Your Message"
            ></textarea>
          </div>
          <div className="text-center">
            <PrimaryButton>Send Message</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

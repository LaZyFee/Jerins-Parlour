import testimonials from "../../../fakeDB/TestomonialData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

function Testomonial() {
  return (
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
  );
}

export default Testomonial;

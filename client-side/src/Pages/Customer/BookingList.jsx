import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BookingList() {
  const [bookingList, setBookingList] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user/bookings`)
      .then((response) => {
        setBookingList(response.data);
      });
  }, []);

  return (
    <>
      {bookingList && bookingList.length > 0 ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">Booking List</h1>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Booking ID</th>
                <th className="px-4 py-2">Service Name</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookingList.map((booking) => (
                <tr key={booking._id}>
                  <td className="border px-4 py-2">{booking._id}</td>
                  <td className="border px-4 py-2">{booking.serviceName}</td>
                  <td className="border px-4 py-2">{booking.date}</td>
                  <td className="border px-4 py-2">{booking.time}</td>
                  <td className="border px-4 py-2">{booking.price}</td>
                  <td className="border px-4 py-2">{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-xl">
          <p>No bookings found.</p>
          <p>
            {" "}
            Please check{" "}
            <Link to={"/services"} className="text-[#F63E7B] font-bold">
              Our Services{" "}
            </Link>
          </p>
        </div>
      )}
    </>
  );
}

export default BookingList;

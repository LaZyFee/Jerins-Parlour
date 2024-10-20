import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Store/AuthStore";
import { toast } from "react-hot-toast";

function BookingList() {
  const [bookingList, setBookingList] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (user && user.email) {
      setLoading(true);
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/user/bookings?email=${
            user.email
          }`
        )
        .then((response) => {
          setBookingList(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error.message);
          toast.error("Error fetching bookings");
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <p>Loading bookings...</p>; // Show loading state
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-5">Booking List</h1>
      {bookingList && bookingList.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Service Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {bookingList.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td>{booking.service}</td>
                  <td>{booking.total}</td>
                  <td>{booking.status}</td>
                  <td>{booking.payment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-xl">
          <p>No bookings found.</p>
          <p>
            Please check{" "}
            <Link to={"/services"} className="text-[#F63E7B] font-bold">
              Our Services
            </Link>
          </p>
        </div>
      )}
    </>
  );
}

export default BookingList;

import { useEffect, useState } from "react";
import { useAuth } from "../../Store/AuthStore";
import noImageFound from "../../assets/images/user.jpg";
import axios from "axios";

function Profile() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.email) {
      setLoading(true);
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/getReviews?email=${user.email}`
        )
        .then((response) => {
          setReviews(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <div className="min-h-screen">
      <div className="card w-full lg:w-80 shadow-xl mx-auto my-5">
        <div className="card-body">
          <img
            src={
              user.profilePic
                ? `${import.meta.env.VITE_BACKEND_URL}/${user.profilePic}`
                : noImageFound
            }
            className="w-72 rounded-xl"
            alt="user profile"
          />
          <h2 className="card-title">Name: {user.name}</h2>
          <p>Email: {user.email}</p>
        </div>
      </div>

      <h1 className="text-3xl font-bold my-5 text-center">Your Reviews</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 my-5 mx-auto lg:mx-10">
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="card w-full max-w-md mx-auto shadow-xl"
            >
              <div className="card-body">
                <h2 className="card-title">
                  Service:{" "}
                  <span className="font-bold text-[#F63E7B]">
                    {review.service}
                  </span>
                </h2>
                <h2 className="card-title">Comments: {review.comment}</h2>
                <p>Rating: {review.rating} Out of 5</p>
                <p>
                  Date:{" "}
                  {review.date &&
                    new Date(review.date).toLocaleString("en-US", {
                      timeZone: "Asia/Dhaka",
                    })}
                </p>
                <p>{review.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;

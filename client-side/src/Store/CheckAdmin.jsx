import axios from "axios";

const CheckAdmin = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/check-admin`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return response.data.isAdmin;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return [false];
  }
};

export default CheckAdmin;

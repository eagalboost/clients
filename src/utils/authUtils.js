import { logoutUser } from "../redux/authSlice";
import { toast } from "react-toastify";

export const handleLogout = async (dispatch, navigate) => {
  try {
    await dispatch(logoutUser()).unwrap();
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/"), 2000);
  } catch (error) {
    console.error("Logout failed:", error);
    toast.error("Logout failed. Please try again.");
  }
};

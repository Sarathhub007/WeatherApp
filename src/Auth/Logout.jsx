import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react"; // Import Clerk's useAuth hook

const Logout = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth(); // Get the signOut function from Clerk

  const handleLogout = async () => {
    try {
      await signOut(); // Log out the user from Clerk
      localStorage.removeItem("userToken"); // Clear token from localStorage (if applicable)
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="nav-button">
      Logout
    </button>
  );
};

export default Logout;
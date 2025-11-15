import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

const Logout = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();        // Cleanly logs out from Clerk
      navigate("/");          // Redirect to home page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="
        px-4 py-2 
        bg-red-500 text-white 
        rounded-lg font-semibold 
        hover:bg-red-600 
        transition-all 
        shadow-md
      "
    >
      Logout
    </button>
  );
};

export default Logout;

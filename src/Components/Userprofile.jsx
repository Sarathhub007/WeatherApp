import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import LogoutButton from "../Auth/Logout";
import "./Userprofile.css";

const UserProfile = () => {
  const { user, isLoaded } = useUser();
  const [loginHistory, setLoginHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const logUserLogin = async () => {
      if (!user || !user.id) {
        console.error("User is not loaded or user ID is missing.");
        return;
      }

      try {
        await fetch(`http://localhost:8080/api/user/${user.id}/login`, {
          method: "POST",
        });
      } catch (err) {
        console.error("Failed to log user login:", err);
      }
    };

    const fetchLoginHistory = async () => {
      if (!user || !user.id) {
        console.error("User is not loaded or user ID is missing.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/login-history?userId=${user.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch login history");
        }
        const data = await response.json();
        setLoginHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && user) {
      logUserLogin();
      fetchLoginHistory();
    }
  }, [isLoaded, user]);

  if (!isLoaded) return <div>Loading user data...</div>;
  if (!user) return <div>Please log in to view your profile.</div>;
  if (loading) return <div>Loading login history...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img className="avatar" src={user.imageUrl} alt="User Avatar" />

        <h2>User Profile</h2>
        <p>
          <strong>Name:</strong> {user.fullName}
        </p>
        <p>
          <strong>Email:</strong> {user.primaryEmailAddress.emailAddress}
        </p>
        <p>
          <strong>Total Login Days:</strong> {loginHistory.length}
        </p>

        <h3>Login History</h3>
        <div className="login-history-container">
          <ul className="login-list">
            {loginHistory.map((entry, index) => (
              <li key={index} className="login-entry">
                <span>{new Date(entry.loginTime).toLocaleDateString()}</span>
                <span className="login-time">
                  {new Date(entry.loginTime).toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Add Logout Button */}
        <LogoutButton />
      </div>
    </div>
  );
};

export default UserProfile;

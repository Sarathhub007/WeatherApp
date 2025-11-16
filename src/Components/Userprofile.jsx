import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import LogoutButton from "../Auth/Logout";

const UserProfile = () => {
  const { user, isLoaded } = useUser();
  const [loginHistory, setLoginHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backend = import.meta.env.VITE_BACKEND_URL;
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!isLoaded || !user || hasRunRef.current) return;

    if (!backend) {
      console.error("Missing backend URL");
      return;
    }

    hasRunRef.current = true;
    console.log(backend);
    const logUserLogin = async () => {
      try {
        await fetch(`${backend}/api/user/${user.id}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        console.error("Failed to log login:", err);
      }
    };

    const fetchLoginHistory = async () => {
      try {
        const res = await fetch(
          `${backend}/api/login-history?userId=${user.id}`
        );
        if (!res.ok) throw new Error("Failed to fetch login history");

        const data = await res.json();
        setLoginHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    logUserLogin();
    fetchLoginHistory();
  }, [isLoaded, user, backend]);

  if (!isLoaded)
    return (
      <div className="text-center mt-20 text-gray-300">Loading user...</div>
    );

  if (!user)
    return (
      <div className="text-center text-lg text-gray-300">Please log in.</div>
    );

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-300">
        Loading login history...
      </div>
    );

  if (error)
    return <div className="text-center text-red-400 mt-6">{error}</div>;

  const uniqueDays = new Set(
    loginHistory.map((item) => new Date(item.loginTime).toDateString())
  ).size;

  return (
    <div className="min-h-screen px-6 py-24 flex justify-center">
      {/* Main Profile Card */}
      <div className="glass-card--bright w-full max-w-xl p-10 rounded-3xl shadow-2xl">
        {/* Avatar + Name */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={user.imageUrl}
            alt="User avatar"
            className="w-28 h-28 rounded-full border-2 border-white shadow-xl"
          />
          <h2 className="text-3xl font-bold text-white mt-4 drop-shadow">
            {user.fullName ?? "User Profile"}
          </h2>
        </div>

        {/* Profile Details */}
        <div className="glass-card p-6 rounded-2xl border border-white/20 shadow-xl mb-8">
          <p className="text-gray-200 text-lg mb-2">
            <b>Name:</b> {user.fullName ?? "N/A"}
          </p>
          <p className="text-gray-200 text-lg mb-2">
            <b>Email:</b> {user.primaryEmailAddress?.emailAddress ?? "N/A"}
          </p>
          <p className="text-gray-200 text-lg">
            <b>Total Login Days:</b> {uniqueDays}
          </p>
        </div>

        {/* Login History */}
        <div>
          <h3 className="text-xl font-bold text-gray-100 mb-3 drop-shadow">
            Login History
          </h3>

          <div className="glass-card p-4 rounded-2xl max-h-60 overflow-y-auto border border-white/20 shadow-xl">
            <ul className="space-y-3">
              {loginHistory.map((entry, index) => {
                const d = new Date(entry.loginTime);
                return (
                  <li
                    key={index}
                    className="glass-card p-3 rounded-xl shadow flex justify-between border border-white/20"
                  >
                    <span className="text-gray-100">
                      {d.toLocaleDateString()}
                    </span>
                    <span className="text-gray-400">
                      {d.toLocaleTimeString()}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Logout */}
        <div className="text-center mt-10">
          <LogoutButton className="px-6 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 shadow-xl transition" />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

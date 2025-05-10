import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Forgot-password.css"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://example.com/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Password reset link sent successfully!");
        navigate("/login");
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card">
        <h1 className="forgot-password-title">Reset Password</h1>
        <form onSubmit={handleForgotPassword} className="forgot-password-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="forgot-password-input"
          />
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="forgot-password-input"
          />
          <button
            type="submit"
            className="forgot-password-button"
            disabled={loading}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
        <p className="forgot-password-footer">
          <span
            onClick={() => navigate("/login")}
            className="login-link"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

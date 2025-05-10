import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import Navbar from "./Components/Navbar"; // Import Navbar
import Login from "./Auth/Login";
import Home from "./Components/Home";
import WeatherPage from "./Components/WeatherPage";
import Signup from "./Auth/Signup";
import Forgotpassword from "./Components/Forgot-password";
import Emergency from "./Components/Emergency";
import Userprofile from "./Components/Userprofile";
import './App.css';
import { useEffect, useState } from "react";

const App = () => {
  const { isLoaded } = useAuth();
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      const timeout = setTimeout(() => {
        setShowApp(true);
      }, 150); 
      return () => clearTimeout(timeout);
    }
  }, [isLoaded]);

  if (!showApp) {
    return (
      <div className="loading-screen">
        <img src="/icons/SVKl.gif" alt="Loading..." className="loader" />
      </div>
    );
  }

  return (
    <Router>
      <Navbar /> {/* Add Navbar here */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={
            <>
              <SignedIn>
                <Navigate to="/Userprofile" />
              </SignedIn>
              <SignedOut>
                <Signup />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <SignedIn>
                <Navigate to="/Userprofile" />
              </SignedIn>
              <SignedOut>
                <Login />
              </SignedOut>
            </>
          }
        />
        <Route path="/forgot-password" element={<Forgotpassword />} />

        {/* Protected Routes */}
        <Route
          path="/Emergency"
          element={
            <SignedIn>
              <Emergency />
            </SignedIn>
          }
        />
        <Route
          path="/Userprofile"
          element={
            <SignedIn>
              <Userprofile />
            </SignedIn>
          }
        />
        <Route
          path="/weather"
          element={
            <SignedIn>
              <WeatherPage />
            </SignedIn>
          }
        />

        {/* Redirect to Home if SignedOut */}
        <Route
          path="*"
          element={
            <SignedOut>
              <Navigate to="/" />
            </SignedOut>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./Auth/ProtectedRoute";

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import WeatherPage from "./Components/WeatherPage";
import Emergency from "./Components/Emergency";
import Userprofile from "./Components/Userprofile";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";

const App = () => {


  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected pages */}
        <Route
          path="/weather"
          element={
            <ProtectedRoute>
              <WeatherPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/emergency"
          element={
            <ProtectedRoute>
              <Emergency />
            </ProtectedRoute>
          }
        />

        <Route
          path="/userprofile"
          element={
            <ProtectedRoute>
              <Userprofile />
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

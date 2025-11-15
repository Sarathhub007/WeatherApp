import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header
      className="
        nav-glass fixed top-4 left-1/2 -translate-x-1/2 
        w-[92%] max-w-5xl 
        px-6 py-3 
        flex justify-between items-center
        z-50
      "
    >
      {/* Logo + Brand */}
      <div className="flex items-center gap-3">
        <img
          src="/icons/download_15591428.gif"
          alt="logo"
          className="w-10 h-10 rounded-full shadow-md"
        />

        <span className="text-2xl font-bold tracking-wide text-white">
          Cloud <span className="text-blue-400">Clover</span>
        </span>
      </div>

      {/* Navigation Buttons */}
      <nav className="flex items-center gap-4">

        {/* PUBLIC BUTTONS (only on Home) */}
        {isHome && (
          <SignedOut>
            <Link
              to="/login"
              className="glass px-5 py-2 rounded-full text-white font-semibold hover:bg-white/20 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="glass px-5 py-2 rounded-full text-white font-semibold hover:bg-white/20 transition"
            >
              Signup
            </Link>
          </SignedOut>
        )}

        {/* LOGGED IN NAVIGATION (hide on Home) */}
        {!isHome && (
          <SignedIn>
            <Link
              to="/weather"
              className="glass px-5 py-2 rounded-full text-white hover:bg-blue-600/30 transition"
            >
              Weather
            </Link>

            <Link
              to="/emergency"
              className="glass px-5 py-2 rounded-full text-white hover:bg-red-600/30 transition"
            >
              Emergency
            </Link>

            <Link
              to="/userprofile"
              className="glass px-5 py-2 rounded-full text-white hover:bg-purple-600/30 transition"
            >
              Profile
            </Link>

            <div className="ml-2 scale-110 hover:scale-125 transition">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

import { useState } from "react";
import {
  Bell,
  Moon,
  Menu,
  X,
  Home,
  Compass,
  UsersRound,
  Calendar,
  User,
  LogOut,
  LogIn,
} from "lucide-react";
import { NavLink, Link } from "react-router";
import dina from "../assets/dina.jpg";
import { useAuth } from "../hooks/useAuth";

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const handleLogout = () => {
    toggle();
    logout();
  };

  const desktopNavClass = ({ isActive }) =>
    `font-medium rounded-lg text-center px-2 py-1 ${
      isActive
        ? "text-orange bg-[#ff5f2214]"
        : "text-manatee hover:text-orange hover:bg-[#ff5f2214]"
    }`;

  const mobileNavClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 ${
      isActive ? "text-orange bg-[#ff5f2214]" : "text-manatee hover:bg-hover"
    }`;

  return (
    <header className="relative flex justify-between p-3 lg:p-6 items-center bg-gray-100">
      <div className="flex gap-5 items-center">
        <div>
          <span className="bg-orange rounded-lg px-4 py-2 mr-2 text-white font-bold">
            E
          </span>
          <h1 className="inline-block font-bold">EventHub</h1>
        </div>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-3">
            <li>
              <NavLink to={"/"} className={desktopNavClass}>
                Explore
              </NavLink>
            </li>
            <li>
              <NavLink to={"/event"} className={desktopNavClass}>
                Event
              </NavLink>
            </li>
            <li>
              <NavLink to={"/communities"} className={desktopNavClass}>
                Communities
              </NavLink>
            </li>
            {isAuthenticated && (
              <li>
                <NavLink to={"/my-events"} className={desktopNavClass}>
                  My Events
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        {!isAuthenticated && (
          <p className="hidden lg:block text-sm text-manatee">
            Browsing as guest
          </p>
        )}

        {isAuthenticated && (
          <div className="relative">
            <Link to={"/notification"}>
              <Bell />
            </Link>
            <span className="rounded-full bg-orange text-xs flex items-center justify-center text-white w-5 h-5 absolute -top-2 -right-1">
              3
            </span>
          </div>
        )}

        <Moon />

        {isAuthenticated ? (
          <>
            <img
              src={dina}
              alt=""
              className="hidden lg:block rounded-full h-8 w-8 cursor-pointer"
              onClick={toggle}
            />
            <button onClick={toggle} className="lg:hidden text-black">
              {isOpen ? <X /> : <Menu />}
            </button>
          </>
        ) : (
          <>
            <Link
              to={"/auth/login"}
              className="hidden lg:block bg-orange py-1.5 px-4 rounded-lg text-white"
            >
              Sign in
            </Link>
            <button onClick={toggle} className="lg:hidden text-black">
              {isOpen ? <X /> : <Menu />}
            </button>
          </>
        )}
      </div>
      {isOpen && (
        <div className="absolute top-full right-3 lg:right-6 mt-2 w-64 bg-white rounded-xl border border-gray-200 shadow-lg z-50">
          {isAuthenticated ? (
            <div className="flex items-center gap-3 p-4 border-b border-gray-200">
              <img src={dina} alt="" className="rounded-full h-10 w-10" />
              <div>
                <p className="font-semibold text-sm capitalize">{user?.name}</p>
                <p className="text-xs text-manatee">{user?.email}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-manatee px-4 pt-4 pb-2 lg:hidden">
              Browsing as guest
            </p>
          )}

          <ul className="py-2 lg:hidden">
            <li>
              <NavLink to={"/"} onClick={toggle} className={mobileNavClass}>
                <Home size={18} /> Explore
              </NavLink>
            </li>
            <li>
              <NavLink to={"/event"} onClick={toggle} className={mobileNavClass}>
                <Compass size={18} /> Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/communities"}
                onClick={toggle}
                className={mobileNavClass}
              >
                <UsersRound size={18} /> Communities
              </NavLink>
            </li>

            {isAuthenticated && (
              <li>
                <NavLink
                  to={"/my-events"}
                  onClick={toggle}
                  className={mobileNavClass}
                >
                  <Calendar size={18} /> My Events
                </NavLink>
              </li>
            )}
          </ul>

          <div className="py-2 border-t border-gray-200 lg:border-t-0">
            {isAuthenticated ? (
              <>
                <NavLink
                  to={"/profile"}
                  onClick={toggle}
                  className={mobileNavClass}
                >
                  <User size={18} /> My Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2.5 text-red-500 w-full hover:bg-hover text-left"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </>
            ) : (
              <Link
                to={"/auth/login"}
                onClick={toggle}
                className="flex items-center gap-3 px-4 py-2.5 text-orange lg:hidden"
              >
                <LogIn size={18} /> Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
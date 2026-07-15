import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getNotifications } from "../../api/notificationApi";
import { FaBell, FaUserCircle, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import toast from "react-hot-toast";
import { getProfile } from "../../api/profileApi";

function Navbar() {

  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {

    loadNotifications();

    loadProfile();

  }, []);

const loadProfile = async () => {

  try {

    const data = await getProfile();

    if (data.success) {

      setUser(data.user);

    }

  } catch (error) {

    console.log(error);

  }

};

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  const loadNotifications = async () => {

    try {

      const data = await getNotifications();

      if (data.success) {

        const unread = data.notifications.filter(
          (item) => item.is_read === 0
        );

        setCount(unread.length);

      }

    } catch (error) {

      console.log(error);

    }

  };

  const handleLogout = () => {

  // Clear Local Storage
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Close Dropdown
  setOpen(false);

  // Success Message
  toast.success("Logged out successfully");

  // Redirect & Remove History
  navigate("/", { replace: true });

};

  return (

    <nav className="bg-white shadow-sm border-b">

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/dashboard"
          className="text-2xl font-bold text-blue-600"
        >

          CareerPilot

        </Link>

        {/* Search */}


        {/* Right */}

        <div className="flex items-center gap-6">

          {/* Notification */}

          <Link
            to="/notifications"
            className="relative text-2xl hover:text-blue-600 transition"
          >

            <FaBell />

            {count > 0 && (

              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">

                {count}

              </span>

            )}

          </Link>

          {/* Profile */}

          <div
            className="relative"
            ref={dropdownRef}
          >

            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-2 py-1 transition"
            >

              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

                S

              </div>

              <div className="hidden md:block text-left">

                <h2 className="font-semibold">
                  {user?.name || "User"}
                  </h2>

              </div>

              <FaChevronDown
                className={`transition ${
                  open ? "rotate-180" : ""
                }`}
              />

            </button>

            {open && (

              <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl border overflow-hidden z-50">

                <button
                  onClick={() => {

                    navigate("/profile");
                    setOpen(false);

                  }}
                  className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                >

                  <FaUserCircle />

                  My Profile

                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50"
                >

                  <FaSignOutAlt />

                  Logout

                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;
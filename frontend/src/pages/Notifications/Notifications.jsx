import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
  getNotifications,
  markAsRead,
} from "../../api/notificationApi";
import toast from "react-hot-toast";

function Notifications() {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {

    try {

      const data = await getNotifications();

      if (data.success) {

        setNotifications(data.notifications);

      }

    } catch (error) {

      console.log(error);

      toast.error("Unable to load notifications.");

    } finally {

      setLoading(false);

    }

  };

  const handleRead = async (id) => {

    try {

      const response = await markAsRead(id);

      if (!response.success) {

        toast.error(response.message);

        return;

      }

      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, is_read: 1 }
            : item
        )
      );

      toast.success("Marked as read");

    } catch (error) {

      console.log(error);

      toast.error("Something went wrong.");

    }

  };

  return (

    <MainLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">

          Notifications

        </h1>

        <p className="text-slate-500 mt-2">

          Stay updated with your CareerPilot activities.

        </p>

      </div>

      {loading ? (

        <div className="text-center text-lg font-semibold">

          Loading...

        </div>

      ) : notifications.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-md p-10 text-center">

          <div className="text-6xl mb-4">
            🔔
          </div>

          <h2 className="text-2xl font-bold">

            No Notifications

          </h2>

        </div>

      ) : (

        <div className="space-y-5">

          {notifications.map((notification) => (

            <div
              key={notification.id}
              className={`rounded-2xl shadow-md p-6 transition ${
                notification.is_read
                  ? "bg-white"
                  : "bg-blue-50 border-l-4 border-blue-600"
              }`}
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-xl font-bold">

                    {notification.title}

                  </h2>

                  <p className="text-gray-600 mt-2">

                    {notification.message}

                  </p>

                  <p className="text-sm text-gray-400 mt-3">

                    {new Date(
                      notification.created_at
                    ).toLocaleString()}

                  </p>

                </div>

                {!notification.is_read && (

                  <button
                    onClick={() =>
                      handleRead(notification.id)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >

                    Mark Read

                  </button>

                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </MainLayout>

  );

}

export default Notifications;
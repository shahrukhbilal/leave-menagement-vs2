// 📦 React and Hooks
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

// Imports Bootstrap’s CSS for ready-to-use styling and grid system.
import "bootstrap/dist/css/bootstrap.min.css";

// 📸 Images
import ManagerImg from "../Myassets/ManagerPic.jpeg";
import HomeIcon from "../Myassets/HomeIcon.jpeg";

function AdminDashBoard() {
  //(localStorage.getItem("user")):: getting user info from browser's local Storage(saved after login)
  // JSON.parse :: converts user's info string to a usable object
  const user = JSON.parse(localStorage.getItem("user"));
  //gives route info, e.g. { pathname: "/admin/leaves" }.
  const location = useLocation();
  // conditional check if the pathname is "/admin"
  const isRoot = location.pathname === "/admin";

  // use of react hook useState to store and update time , events, and todays evnts
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [showEvents, setShowEvents] = useState(false);

  //  use of react hook useEffect to ⏱️ Update Time Every Second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // use of react hook useEffect to 📅 Fetch Today's Events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        const today = new Date().toISOString().split("T")[0];

        const filtered = data.filter((event) => {
          const eventDate = new Date(event.start).toISOString().split("T")[0];
          return eventDate === today;
        });

        setTodaysEvents(filtered);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };

    fetchEvents();
  }, []);

  // converts date and time to human readable formatt
  const formattedDate = currentTime.toLocaleDateString();
  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* ======= Sidebar ======= */}
        <div className="col-md-3 bg-dark text-white p-4">
          <h4>Welcome, {user?.name || "Admin"}</h4>
          <span className="badge bg-success">🟢 Active</span>
          <hr />
          <ul className="nav flex-column mt-4">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin">
                🏠 Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin/leaves">
                📄 Leave Requests
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin/attendance">
                📋 Attendance
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin/calendar">
                📅 Calendar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin/events">
                🎉 Events
              </Link>
            </li>
          </ul>
        </div>

        {/* ======= Main Content ======= */}
        <div className="col-md-9 p-0 position-relative">
          {isRoot ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                backgroundImage: `url(${ManagerImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100%",
                minHeight: "100vh",
                position: "relative",
                zIndex: 2,
              }}
            >
              {/* 🔲 Dark Overlay */}
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                  zIndex: 2,
                }}
              ></div>

              {/* 🏠 Home Icon (Top Left) */}
              <img
                src={HomeIcon}
                alt="Home Icon"
                style={{
                  position: "absolute",
                  top: 20,
                  left: 30,
                  width: "100px",
                  height: "100px",
                  zIndex: 2,
                }}
              />

              {/* 📅 Date, Time, Events (Top Right) */}
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  right: 30,
                  zIndex: 3,
                  textAlign: "right",
                  color: "#ffffff",
                }}
              >
                <div style={{ fontSize: "1.2rem", fontWeight: "700" }}>
                  📅 {formattedDate}
                </div>
                <div style={{ fontSize: "1rem" }}>⏰ {formattedTime}</div>

                {/* 🎉 Toggle Events Button */}
                <button
                  className="btn btn-light mt-2 btn-sm"
                  onClick={() => setShowEvents(!showEvents)}
                >
                  🎉 Today's Events
                </button>

                {/* 🔽 Event Dropdown */}
                {showEvents && (
                  <div
                    className="mt-2 p-2"
                    style={{
                      background: "white",
                      color: "#000",
                      borderRadius: "8px",
                      maxWidth: "250px",
                      textAlign: "left",
                      boxShadow: "0 0 8px rgba(0,0,0,0.2)",
                    }}
                  >
                    {todaysEvents.length > 0 ? (
                      <ul className="list-unstyled mb-0">
                        {todaysEvents.map((event, idx) => (
                          <li key={idx}>
                            <strong>{event.title}</strong>
                            <br />
                            🕒 {new Date(event.start).toLocaleTimeString()}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div>🎈 No events today. Enjoy your day!</div>
                    )}
                  </div>
                )}
              </div>

              {/* 👋 Welcome Message Centered */}
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  color: "white",
                  textAlign: "center",
                  padding: "40px",
                  marginBottom: "570px",
                }}
              >
                <h1 style={{ fontSize: "2rem", fontWeight: "700" }}>
                  Welcome to Admin Dashboard
                </h1>
                <p style={{ fontSize: "1.2rem", fontWeight: "550" }}>
                  Manage leaves, attendance and events efficiently
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <Outlet />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashBoard;

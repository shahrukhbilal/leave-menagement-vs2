import React from "react";
import { motion } from "framer-motion";
import bgImage from "./Myassets/home3.jpeg";
import Footer from "./Footer";
import Register from "./components/Register";

function Home() {
  return (
    <div>
      {/* 🔹 Hero Section */}
      <section
        className="d-flex align-items-center justify-content-center text-light"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        {/* 🔹 Dark Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        ></div>

        {/* 🔹 Main Content */}
        <div className="container position-relative z-3">
          <div className="row align-items-center">
            
            {/* LEFT: Welcome Text */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="col-md-6 mb-4 mb-md-0 text-start"
            >
              <h1 className="display-5 fw-bold mb-3 text-shadow">
                Welcome to Our Leave Management System
              </h1>
              <p className="lead text-light">
                Our Leave Management System simplifies and automates the process of
                requesting and approving leaves within an organization. Employees can
                easily apply for leave, while managers can review and approve requests
                efficiently.
              </p>
            </motion.div>

            {/* RIGHT: Register Form */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="col-md-6 d-flex justify-content-center justify-content-md-end"
            >
              <div className="bg-dark bg-opacity-50 p-4 rounded-4 shadow-lg" style={{ minWidth: "350px" }}>
                <Register />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 🔹 Footer */}
      <Footer />
    </div>
  );
}

export default Home;

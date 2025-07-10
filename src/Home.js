import React from "react";
import bgImage from "./Myassets/benjamin-lehman-i3VR6GK6Pfk-unsplash.jpg";
import Footer from "./Footer";

function Home() {
  const sectionStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    position: "relative",
    color: "white",
  };

  const overlayStyle = {
    
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(110, 106, 106, 0.4)", // 🔴 This is the transparent overlay
    zIndex: 2,
  };

  const contentStyle = {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    width: "600px",
    margin: 'auto',
    textAlign: "center",
    top: "10%",
    marginLeft: '60%'
     
  };

  return (
    <div>
      
      <section style={sectionStyle}>
        {/* 🟣 Transparent overlay */}
        <div style={overlayStyle}></div>

        {/* 🟡 Actual content */}
        <div style={contentStyle}>
          <h1>Welcome to Our Leave Management System</h1>
          <p>
            Our Leave Management System is a comprehensive tool designed to
            simplify and automate the process of requesting and approving
            leaves within an organization. It allows employees to easily submit
            leave applications while providing managers with a streamlined
            workflow to review and approve or reject requests.
          </p>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}

export default Home;

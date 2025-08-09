import React from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  showProfileButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showProfileButton = true }) => {
  const navigate = useNavigate();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "10px 20px",
        color: "black",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => navigate("/dashboard")}
      >
        <img
          src="https://cdn.prod.website-files.com/6509887b9119507025235a5a/650ada40fd6cf3427547c9d8_Swift%20logo.svg"
          alt="Swift Logo"
          style={{
            height: "50px",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Profile Circle */}
      {showProfileButton && (
  <div
    style={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      zIndex: 999, // ensure it shows above other elements
    }}
    onClick={() => navigate("/profile")}
  >
    {/* Circular Image */}
    <div
  style={{
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#000",
    overflow: "hidden",
  }}
>
      <img
        src="https://randomuser.me/api/portraits/men/75.jpg"
        alt="Profile"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>

    {/* Profile Text */}
    <div
      style={{
        marginTop: "5px",
        backgroundColor: "#198754",
        color: "white",
        padding: "4px 7px",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: "normal",
        textAlign: "center",
        zIndex: 1000,
      }}
    >
      View Profile
    </div>
  </div>
)}


    </header>
  );
};

export default Header;

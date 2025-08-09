import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/types";

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => r.json())
      .then((data: User[]) => {
        if (data && data.length) setUser(data[0]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div style={{ padding: "20px", textAlign: "center", fontSize: "18px" }}>
        Loading profile...
      </div>
    );

  if (!user)
    return (
      <div style={{ padding: "20px", textAlign: "center", fontSize: "18px" }}>
        No user found.
      </div>
    );

  const avatarLetter = user.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
  <div
    style={{
      minHeight: "100vh", // full screen height
      backgroundColor: "#282B4A",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Header */}
    <div
  style={{
    display: "flex",
    flexWrap: "wrap", // allows stacking on small screens
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: "10px 20px",
  }}
>
  <button
    onClick={() => navigate("/dashboard")}
    style={{
      backgroundColor: "#1b1e3e",
      color: "#fff",
      border: "none",
      padding: "10px 14px",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "clamp(10px, 1.2vw, 14px)", // scales between small & large
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      transition: "background 0.3s ease",
      flexShrink: 0, // prevent shrinking
    }}
    onMouseOver={(e) =>
      ((e.target as HTMLButtonElement).style.backgroundColor = "#2980b9")
    }
    onMouseOut={(e) =>
      ((e.target as HTMLButtonElement).style.backgroundColor = "#1b1e3e")
    }
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M15 8a.5.5 0 0 1-.5.5H3.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.498.498 0 0 1-.106-.168.502.502 0 0 1 0-.38.498.498 0 0 1 .106-.168l4-4a.5.5 0 0 1 .708.708L3.707 7.5H14.5A.5.5 0 0 1 15 8z"
      />
    </svg>
    Back to Dashboard
  </button>

  <h2
    style={{
      flex: 1,
      textAlign: "center",
      margin: "10px 0",
      fontSize: "clamp(20px, 4vw, 40px)", 
      color: "#1b1e3e",
    }}
  >
    User Profile
  </h2>

  <div style={{ width: "90px", flexShrink: 0 }} />
</div>


    {/* Card Center Wrapper */}
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#f9f9f9",
          borderRadius: "50px",
          padding: "30px 20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        {/* Avatar */}
        <img
         src="https://randomuser.me/api/portraits/men/75.jpg"
         alt="Profile"
         style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          objectFit: "cover",
          margin: "0 auto 20px auto",
          display: "block",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
         }}
        />

        {/* First Field - User Name */}
        <div style={{ fontWeight: "normal", fontSize: "18px", color: "#34495e" }}>
          User Name
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "#000",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "6px",
            marginBottom: "20px",
          }}
        >
          {user.username}
        </div>

        {/* Remaining Fields */}
        {[
          { label: "Name", value: user.name },
          { label: "Email", value: user.email },
          { label: "Phone", value: user.phone },
          { label: "Website", value: user.website },
          { label: "Company", value: user.company?.name ?? "-" },
        ].map((field, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <div
              style={{
                fontWeight: "normal",
                fontSize: "18px",
                color: "#34495e",
                marginBottom: "6px",
              }}
            >
              {field.label}
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "#000",
                fontWeight: 'bold',
                borderBottom: "1px solid #ccc",
                paddingBottom: "4px",
              }}
            >
              {field.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

};

export default Profile;

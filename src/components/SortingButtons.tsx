import React from "react";

type SortCol = "postId" | "name" | "email" | null;
type SortDir = "none" | "asc" | "desc";

interface SortingButtonsProps {
  sortCol: SortCol;
  sortDir: SortDir;
  handleSortClick: (col: SortCol) => void;
}

const SortingButtons: React.FC<SortingButtonsProps> = ({
  sortCol,
  sortDir,
  handleSortClick,
}) => {
  const colArrow = (col: SortCol) => {
    if (sortCol !== col) return "";
    if (sortDir === "asc") {
      return <span style={{ color: "lightgreen" }}> ▲</span>;
    }
    if (sortDir === "desc") {
      return <span style={{ color: "red" }}> ▼</span>;
    }
    return "";
  };

  const btnStyle: React.CSSProperties = {
    backgroundColor: "#1B1E3E",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "8px 14px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "4px",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "12px",
        alignItems: "center",
      }}
    >
      <span style={{ fontWeight: "bold", fontSize: "16px", color: "#1B1E3E" }}>
        Filters:
      </span>
      <button style={btnStyle} onClick={() => handleSortClick("postId")}>
        Post ID{colArrow("postId")}
      </button>
      <button style={btnStyle} onClick={() => handleSortClick("name")}>
        Name{colArrow("name")}
      </button>
      <button style={btnStyle} onClick={() => handleSortClick("email")}>
        Email{colArrow("email")}
      </button>
    </div>
  );
};

export default SortingButtons;

import React from "react";
import type { CommentItem } from "../types/types";

interface TableProps {
  data: CommentItem[];
  handleSortClick: (col: "postId" | "name" | "email" | null) => void;
  colArrow: (col: "postId" | "name" | "email" | null) => string;
}

const Table: React.FC<TableProps> = ({ data, handleSortClick, colArrow }) => {
  const tableWrapStyle: React.CSSProperties = {
    width: "100%",
    overflowX: "auto",
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
  };

  const thStyle: React.CSSProperties = {
    padding: "12px 15px",
    backgroundColor: "#d9e6f7",
    fontWeight: "bold",
    textAlign: "center",
    border: "1px solid #ddd",
    cursor: "pointer",
  };

  const tdStyle: React.CSSProperties = {
    padding: "12px 15px",
    border: "1px solid #ddd",
    textAlign: "left",
    verticalAlign: "top",
  };

  const bodyCellStyle: React.CSSProperties = {
    ...tdStyle,
    whiteSpace: "normal",
    wordWrap: "break-word",
  };

  return (
    <div style={tableWrapStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle} onClick={() => handleSortClick("postId")}>
              Post ID{colArrow("postId")}
            </th>
            <th style={thStyle} onClick={() => handleSortClick("name")}>
              Name{colArrow("name")}
            </th>
            <th style={thStyle} onClick={() => handleSortClick("email")}>
              Email{colArrow("email")}
            </th>
            <th style={{ ...thStyle, cursor: "default" }}>Phone</th>
            <th style={{ ...thStyle, cursor: "default" }}>Comment</th>
          </tr>
        </thead>
        <tbody>
          {data.map((c, i) => (
            <tr
              key={c.id}
              style={{
                backgroundColor: i % 2 === 0 ? "#f2f2f2" : "#ffffff",
              }}
            >
              <td style={tdStyle}>{c.postId}</td>
              <td style={tdStyle}>{c.name}</td>
              <td style={tdStyle}>{c.email}</td>
              <td style={tdStyle}>{c.phone}</td>
              <td style={bodyCellStyle}>{c.body}</td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={5}
                style={{
                  textAlign: "center",
                  padding: 18,
                  border: "1px solid #ddd",
                }}
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

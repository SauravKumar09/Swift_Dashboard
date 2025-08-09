import React from "react";

interface SearchControlsProps {
  search: string;
  setSearch: (value: string) => void;
  pageSize: number;
  setPageSize: (value: number) => void;
  setPage: (value: number) => void;
}

const SearchControls: React.FC<SearchControlsProps> = ({
  search,
  setSearch,
  pageSize,
  setPageSize,
  setPage,
}) => {
  return (
    <div className="controls">
      <style>
        {`
          .controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            flex-wrap: wrap; /* allow wrapping for small screens */
          }

          .controls .search-container {
            flex: 1;
            display: flex;
            justify-content: center;
          }

          .controls .search-container input {
            width: 80%;
            padding: 12px 12px;
            border-radius: 6px;
            border: 2px solid #1b1e3e;
            outline: none;
            font-size: 14px;
          }

          .controls .page-size-container {
            flex: 0;
            display: flex;
            justify-content: flex-end;
            margin-right: 30px;
          }

          /* Small screens: search left, pages right */
          @media (max-width: 600px) {
            .controls {
              flex-wrap: nowrap;
            }
            .controls .search-container {
              justify-content: flex-start;
              flex: 1;
            }
            .controls .search-container input {
              width: 100%;
            }
            .controls .page-size-container {
              justify-content: flex-end;
              flex: 0;
              margin-right: 0;
              margin-left: 10px;
            }
          }
        `}
      </style>

      {/* Search Bar */}
      <div className="search-container">
        <input
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Page size selector */}
      <div className="page-size-container">
        <label style={{ display: "flex", alignItems: "center", fontSize: "16px" }}>
          Page size&nbsp;
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            style={{
              padding: "6px 8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "14px",
            }}
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default SearchControls;

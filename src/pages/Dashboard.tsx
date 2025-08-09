import React, { useEffect, useMemo, useState } from "react";
import type { CommentItem } from "../types/types";
import Pagination from "../components/Pagination";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Header from "../components/Header";

import CommentsTable from "../components/Table";
import SearchControls from "../components/SearchControls.";
import SortingButtons from "../components/SortingButtons";

type SortDir = "none" | "asc" | "desc";
type SortCol = "postId" | "name" | "email" | null;

const STORAGE_KEY = "dashboard_state_v1";

interface PersistState {
  search: string;
  page: number;
  pageSize: number;
  sortCol: SortCol;
  sortDir: SortDir;
}

const initialPersist: PersistState = {
  search: "",
  page: 1,
  pageSize: 10,
  sortCol: null,
  sortDir: "none",
};

function genPhoneFor(id: number) {
  const base = 9000000000 + id;
  return `+91${base.toString().slice(-10)}`;
}

const Dashboard: React.FC = () => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [persist, setPersist] = useLocalStorage<PersistState>(STORAGE_KEY, initialPersist);

  const [search, setSearch] = useState<string>(persist.search);
  const [page, setPage] = useState<number>(persist.page);
  const [pageSize, setPageSize] = useState<number>(persist.pageSize);
  const [sortCol, setSortCol] = useState<SortCol>(persist.sortCol);
  const [sortDir, setSortDir] = useState<SortDir>(persist.sortDir);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((r) => r.json())
      .then((data: any[]) => {
        const mapped: CommentItem[] = data.map((c) => ({
          postId: c.postId,
          id: c.id,
          name: c.name,
          email: c.email,
          body: c.body,
          phone: genPhoneFor(c.id),
        }));
        setComments(mapped);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setPersist({ search, page, pageSize, sortCol, sortDir });
  }, [search, page, pageSize, sortCol, sortDir, setPersist]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return comments;
    return comments.filter((c) =>
      [c.name, c.email, c.phone].some((field) => field.toLowerCase().includes(q))
    );
  }, [comments, search]);

  const sorted = useMemo(() => {
    if (!sortCol || sortDir === "none") return filtered;
    return [...filtered].sort((a, b) => {
      let va: string | number = a[sortCol];
      let vb: string | number = b[sortCol];
      if (typeof va === "string") va = va.toLowerCase();
      if (typeof vb === "string") vb = vb.toLowerCase();
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  const handleSortClick = (col: SortCol) => {
    if (sortCol !== col) {
      setSortCol(col);
      setSortDir("asc");
    } else {
      if (sortDir === "asc") setSortDir("desc");
      else if (sortDir === "desc") {
        setSortDir("none");
        setSortCol(null);
      } else setSortDir("asc");
    }
    setPage(1);
  };

  const colArrow = (col: SortCol) =>
    sortCol === col ? (sortDir === "asc" ? " ▲" : sortDir === "desc" ? " ▼" : "") : "";

  if (loading) return <div className="container">Loading comments...</div>;

  return (
    <div className="container">
      <Header />
      <h2 style={{ fontSize: "40px", textAlign: "center", color: "#1b1e3e" }}>
        Comments Dashboard
      </h2>

      <SearchControls
        search={search}
        setSearch={setSearch}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setPage={setPage}
      />
      <SortingButtons 
      sortCol={sortCol} 
      sortDir={sortDir} 
      handleSortClick={handleSortClick} 
      />

      <CommentsTable data={pageData} handleSortClick={handleSortClick} colArrow={colArrow} />

      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "16px",
    padding: "10px 15px",
    borderTop: "1px solid #ddd",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
    flexWrap: "wrap",
    gap: "10px",
  }}
>
  <div>
    Showing{" "}
    <strong>{(page - 1) * pageSize + 1}</strong> to{" "}
    <strong>{Math.min(page * pageSize, sorted.length)}</strong> of{" "}
    <strong>{sorted.length}</strong> entries
  </div>
  <div>
    <Pagination
      current={page}
      total={totalPages}
      onPageChange={(p) => setPage(p)}
    />
  </div>
</div>

    </div>
  );
};

export default Dashboard;

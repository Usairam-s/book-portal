"use client";
import { useState } from "react";

const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search by title or author..."
      value={searchTerm}
      onChange={handleChange}
      className="px-4 py-2 border rounded-md shadow-md"
    />
  );
};

export default SearchComponent;

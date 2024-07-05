"use client";
import { useEffect, useState } from "react";
import SingleBook from "./SingleBook";
import Link from "next/link";
import SearchComponent from "./SearchComponent";
import toast from "react-hot-toast";
import SkeletonLoader from "./SkeletonLoader";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async (searchTerm = "") => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/books?search=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting...");
    try {
      const response = await fetch(
        `http://localhost:5000/api/books/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      toast.success("Deleted", { id: toastId });
      setBooks(books.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete", { id: toastId });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">All Books</h1>
        <div className="md:inline hidden">
          <SearchComponent onSearch={fetchBooks} />
        </div>
      </div>
      <hr />
      {loading ? (
        <SkeletonLoader />
      ) : books.length === 0 ? (
        <div className="text-center mt-4">
          <p className="text-xl">
            No books available{" "}
            <span role="img" aria-label="emoji">
              ☹️
            </span>
          </p>
          <hr className="my-4 border-gray-300" />
        </div>
      ) : (
        <ul className="space-y-4 max-h-64 overflow-y-auto">
          {books.map((book) => (
            <SingleBook key={book._id} book={book} onDelete={handleDelete} />
          ))}
        </ul>
      )}
      <p className="items-center text-center underline text-gray-600 mt-3">
        By Usairam Saleem
      </p>
    </div>
  );
};

export default BookList;

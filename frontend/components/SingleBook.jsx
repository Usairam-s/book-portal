import React from "react";
import moment from "moment";
import Link from "next/link";
function SingleBook({ book, onDelete }) {
  return (
    <div className="my-3">
      <div className="w-full">
        <h2 className="font-semibold md:text-xl uppercase"> {book.title}</h2>
        <p className="text-gray-500 md:text-sm text-xs">{book.author}</p>
      </div>
      <div className="md:flex items-center justify-between">
        <div className="flex items-center md:gap-4 justify-between my-3">
          <h2 className="bg-orange-300 text-xs md:text-normal px-2 py-1 rounded-md">
            📄 {book.no_of_pages}
          </h2>
          <h2 className="bg-blue-300 text-xs md:text-normal  px-2 py-1 rounded-md">
            🗓 {moment(book.published_at).format("DD MMM YY")}
          </h2>
        </div>

        <div className="flex justify-center mt-6 md:mt-0 items-center gap-3">
          <Link
            href={`/editbook/${book._id}`}
            className="px-2 py-1 rounded-md bg-green-300 text-xs md:text-normal"
          >
            {" "}
            ✏️ <span>Edit</span>
          </Link>
          <button
            onClick={() => onDelete(book._id)}
            className="px-2 py-1 rounded-md bg-red-300 text-xs md:text-normal"
          >
            {" "}
            🗑 <span>Delete</span>
          </button>
        </div>
      </div>
      <hr className="mt-3" />
    </div>
  );
}

export default SingleBook;

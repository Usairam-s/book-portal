"use client";

import BookForm from "@/components/BookForm";
import SkeletonLoader from "@/components/SkeletonLoader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function EditBookPage({ params }) {
  const router = useRouter();
  const id = params.id;

  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/books/${id}`)
        .then((response) => response.json())
        .then((data) => {
          const formattedData = {
            ...data,
            published_at: data.published_at.split("T")[0],
          };
          setBookData(formattedData);
        })
        .catch((error) => {
          console.error("Error fetching book data:", error);
        });
    }
  }, [id]);

  return (
    <div className="mt-10 bg-white rounded-md shadow-md p-6 text-black">
      <h1 className="text-xl font-semibold">Edit Book</h1>
      {bookData ? <BookForm initialValues={bookData} /> : <SkeletonLoader />}
    </div>
  );
}

export default EditBookPage;

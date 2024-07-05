"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function BookForm({ initialValues }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    no_of_pages: "",
    published_at: "",
  });
  const [today, setToday] = useState("");

  useEffect(() => {
    const todayDate = new Date().toISOString().split("T")[0];
    setToday(todayDate);
  }, []);

  // Update form values if initialValues change (for edit)
  useEffect(() => {
    if (initialValues) {
      setForm((prevForm) => ({
        ...prevForm,
        ...initialValues,
        published_at: initialValues.published_at.split("T")[0], // Format the date correctly
      }));
    }
  }, [initialValues]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    const { title, author, no_of_pages, published_at } = form;

    const toastId = toast.loading(
      initialValues ? "Updating book..." : "Adding your book..."
    );

    try {
      const apiUrl = initialValues
        ? `http://localhost:5000/api/books/update/${initialValues._id}`
        : "http://localhost:5000/api/books/create";

      const method = initialValues ? "PUT" : "POST";

      const response = await fetch(apiUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          author,
          no_of_pages,
          published_at,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success(
        initialValues
          ? "Book updated successfully!"
          : "Book added successfully!!",
        {
          id: toastId,
        }
      );

      // Clear form fields after successful submission
      setForm({ title: "", author: "", no_of_pages: "", published_at: "" });
      setSubmitting(false);

      // Redirect to home page after successful submission
      router.push("/");
    } catch (error) {
      toast.error(
        initialValues
          ? "Failed to update book. Please try again."
          : "Failed to add book. Please try again.",
        { id: toastId }
      );
      setSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-gray-500" htmlFor="title">
            Title
          </label>
          <input
            placeholder="Enter title"
            type="text"
            name="title"
            id="title"
            className="bg-gray-200 p-2 rounded-md outline-none"
            autoComplete="off"
            onChange={handleChange}
            value={form.title}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-500" htmlFor="author">
            Author
          </label>
          <input
            placeholder="Enter Author Name"
            type="text"
            name="author"
            id="author"
            className="bg-gray-200 p-2 rounded-md outline-none"
            autoComplete="off"
            onChange={handleChange}
            value={form.author}
            required
          />
        </div>
        <div className="md:flex md:space-x-2 items-center md:gap-2">
          <div className="flex flex-col gap-1 md:w-1/2">
            <label className="text-gray-500" htmlFor="no_of_pages">
              Number of Pages
            </label>
            <input
              placeholder="Enter no of pages"
              type="number"
              name="no_of_pages"
              id="no_of_pages"
              className="bg-gray-200 p-2 rounded-md outline-none"
              autoComplete="off"
              onChange={handleChange}
              value={form.no_of_pages}
              required
            />
          </div>
          <div className="flex flex-col gap-1 md:w-1/2">
            <label className="text-gray-500" htmlFor="published_at">
              Published At
            </label>
            <input
              placeholder="Select Date"
              type="date"
              name="published_at"
              id="published_at"
              className="bg-gray-200 p-2 rounded-md outline-none"
              autoComplete="off"
              onChange={handleChange}
              value={form.published_at}
              required
              max={today}
            />
          </div>
        </div>
        <button
          disabled={submitting}
          type="submit"
          className="mt-3 w-full bg-black text-white font-medium rounded-md p-2"
        >
          {initialValues ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default BookForm;

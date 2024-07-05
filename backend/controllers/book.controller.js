import Book from "../models/book.model.js";

//create book
export const createBook = async (req, res) => {
  const { title, author, no_of_pages, published_at } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      no_of_pages,
      published_at,
    });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get all books
export const getAllBooks = async (req, res) => {
  const { search } = req.query;

  try {
    let books;
    if (search) {
      const searchRegex = new RegExp(search, "i"); // case-insensitive regex
      books = await Book.find({
        $or: [{ title: searchRegex }, { author: searchRegex }],
      });
    } else {
      books = await Book.find().sort({ createdAt: -1 });
    }
    res.json(books);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get single book
export const getSingleBook = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findById(id);
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update book
export const updateBook = async (req, res) => {
  const { title, author, no_of_pages, published_at } = req.body;
  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    { title, author, no_of_pages, published_at },
    { new: true }
  );
  if (!updatedBook) return res.status(404).json({ message: "Book not found" });
  res.json(updatedBook);
};

//delete book
export const deleteBook = async (req, res) => {
  const deletedBook = await Book.findByIdAndDelete(req.params.id);
  if (!deletedBook) return res.status(404).json({ message: "Book not found" });
  res.json({ message: "Book deleted successfully" });
};

import express from "express";

import {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getSingleBook,
} from "../controllers/book.controller.js";

const router = express.Router();

// create new book
router.post("/create", createBook);
//get all books
router.get("/", getAllBooks);
//get single book
router.get("/:id", getSingleBook);
//update book
router.put("/update/:id", updateBook);
//delete book
router.delete("/delete/:id", deleteBook);

export default router;

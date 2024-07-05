import express from "express";
import cors from "cors";
import { connectDb } from "./db/connection.js";
import bookRoutes from "./routes/bookRoutes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

//connect to database
connectDb();

//routes
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

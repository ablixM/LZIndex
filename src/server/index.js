import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import searchRoute from "./routes/search.js";

// Get current file path (ES modules don't have __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(
  cors({
    origin:
      [
        process.env.FRONTEND_URL,
        "https://lzindex.vercel.app",
        "https://lzindex-server.onrender.com",
        "http://localhost:5173",
      ] || "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// Middleware to serve static frontend files
app.use(express.static(path.join(__dirname, "../../public")));

// API Routes
app.use("/api/search", searchRoute);

// Default route to serve the frontend (for single-page apps)
app.get("/", (req, res) => {
  res.send("LayerZero AI API Server is running");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

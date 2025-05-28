import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // allow json data in req.body

console.log("NODE_ENV check:", process.env.NODE_ENV);
console.log("Is production?", process.env.NODE_ENV === "production");
console.log("Path exists:", path.join(__dirname, "/frontend/dist/index.html"));

if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "/frontend/dist");
  console.log("Serving static files from:", staticPath);
  
  // Serve static files first
  app.use(express.static(staticPath));
}

// API routes should come AFTER static files but BEFORE catch-all
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  // Catch-all handler should be LAST
  app.get("*", (req, res) => {
    const indexPath = path.resolve(__dirname, "frontend", "dist", "index.html");
    console.log("Serving index.html from:", indexPath);
    res.sendFile(indexPath);
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
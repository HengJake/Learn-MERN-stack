import express from "express";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/product.controllers.js";

const router = express.Router();

// api for view all product
router.get("/", getProduct);

// api for uploading product
router.post("/", createProduct);

router.put("/:id", updateProduct);

// dynamic it will get the id / api for deleting product
router.delete("/:id", deleteProduct);

export default router;

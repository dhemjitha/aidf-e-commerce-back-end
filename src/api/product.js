import express from "express";
import { getAllProducts, getProductById, createProduct, deleteProductById, updateProductById } from "../application/product.js";

const productRouter = express.Router();

// productRouter.get("/", getAllProducts);
// productRouter.get("/:id", getProductById);
// productRouter.post("/", createProduct);
// productRouter.delete("/:id", deleteProductById);
// productRouter.put("/:id", updateProductById);

productRouter.route("/").get(getAllProducts).post(createProduct);
productRouter.route("/:id").get(getProductById).put(updateProductById).delete(deleteProductById);

export default productRouter;
import express from "express";
import { getAllProducts, getProductById, createProduct, deleteProductById, updateProductById } from "../application/product";
import { isAuthenticated } from "./middleware/authentication-middleware";
import { isAdmin } from "./middleware/authorization-middleware";

const productRouter = express.Router();

// productRouter.get("/", getAllProducts);
// productRouter.get("/:id", getProductById);
// productRouter.post("/", createProduct);
// productRouter.delete("/:id", deleteProductById);
// productRouter.put("/:id", updateProductById);

productRouter.route("/").get(getAllProducts).post(isAuthenticated, isAdmin, createProduct);
productRouter.route("/:id").get(getProductById).put(isAuthenticated, isAdmin, updateProductById).delete(isAuthenticated, isAdmin, deleteProductById);

export default productRouter;
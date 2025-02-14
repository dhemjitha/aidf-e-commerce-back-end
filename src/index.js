import "dotenv/config";
import express from "express";
import productRouter from "./api/product.js";
import connectDB from "./infrastructure/db.js";
import userRouter from "./api/user.js";
import buyingRouter from "./api/buying.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/buyings", buyingRouter);

const PORT = 8000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
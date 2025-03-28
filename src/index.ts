import "dotenv/config";
import express from "express";
import productRouter from "./api/product";
import connectDB from "./infrastructure/db";
import userRouter from "./api/user";
import buyingRouter from "./api/buying";
import cors from "cors";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware";
import { clerkMiddleware } from "@clerk/express";

const app = express();

app.use(clerkMiddleware());

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/buyings", buyingRouter);

app.use(globalErrorHandlingMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
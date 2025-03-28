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
app.use(cors({
    origin: [
      'http://localhost:5173',  // Vite development server
      'https://aidf-e-commerce-front-end.vercel.app',  // Your Vercel frontend deployment
      'https://aidf-e-commerce-back-end.vercel.app',  // Your backend deployment if needed
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

connectDB();

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/buyings", buyingRouter);

app.use(globalErrorHandlingMiddleware);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
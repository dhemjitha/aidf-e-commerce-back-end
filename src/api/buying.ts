import express from 'express';
import { createBuying, getAllBuyings, getAllBuyingsForProduct } from '../application/buying';
import { isAuthenticated } from './middleware/authentication-middleware';

const buyingRouter = express.Router();

buyingRouter.route("/").post(createBuying).get(getAllBuyings);
buyingRouter.route("/products/:productId").get(getAllBuyingsForProduct);

export default buyingRouter;
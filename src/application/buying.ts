import { Request, Response, NextFunction } from "express";
import Buying from "../infrastructure/schemas/Buying";
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/errors/not-found-error";

export const createBuying = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const buying = req.body;

        if (!buying.productId || !buying.userId || !buying.checkoutDate) {
            throw new ValidationError("Invalid buying data");
        }

        await Buying.create({
            productId: buying.productId,
            userId: buying.userId,
            checkoutDate: buying.checkoutDate,
        });

        res.status(201).send();
        return;
    } catch (error) {
        next(error);
    }
};

export const getAllBuyingsForProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.productId;
        const buyings = await Buying.find({ productId: productId }).populate("productId").populate("userId");
        
        if (!buyings || buyings.length === 0) {
            throw new NotFoundError("No product found with this ID");
        }

        res.status(200).json(buyings);
        return;
    } catch (error) {
        next(error);
    }
}

export const getAllBuyings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const buyings = await Buying.find();
        res.status(200).json(buyings);
        return;
    } catch (error) {
        next(error);
    }
}
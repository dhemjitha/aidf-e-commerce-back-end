import { Request, Response, NextFunction } from "express";
import Buying from "../infrastructure/schemas/Buying";
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/errors/not-found-error";
import { CreateBuyingDTO } from "../domain/dtos/buying"; 

export const createBuying = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const buying = CreateBuyingDTO.safeParse(req.body);
        console.log(buying);

        if(!buying.success){
            throw new ValidationError(buying.error.message);
        }

        //@ts-ignore
        const user = req.auth;

        if (!user || !user.userId) {
            throw new ValidationError("User authentication failed or user ID missing.");
        }

        await Buying.create({
            productId: buying.data.productId,
            userId: user.userId,
            quantity: buying.data.quantity,
            shippingAddress: buying.data.shippingAddress,
            mobileNumber: buying.data.mobileNumber,
            checkoutDate: buying.data.checkoutDate,
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
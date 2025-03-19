import { Request, Response, NextFunction } from "express";
import Product from "../infrastructure/schemas/Product";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
        return;
    } catch (error) {
        next(error);
    }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            throw new NotFoundError("Product not found");
        }
        res.status(200).json(product);
        return;
    } catch (error) {
        next(error);
    }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = req.body;

        if (
            !product.name ||
            !product.brand ||
            !product.image ||
            !product.price ||
            !product.description
        ) {
            throw new ValidationError("Invalid product data");
        }

        await Product.create({
            name: product.name,
            brand: product.brand,
            image: product.image,
            price: parseInt(product.price),
            description: product.description
        });

        res.status(201).send();
        return;
    } catch (error) {
        next(error);
    }
}

export const deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id;
        await Product.findByIdAndDelete(productId);
        res.status(200).send();
        return;
    } catch (error) {
        next(error);
    }
}

export const updateProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id;
        const updatedProduct = req.body;

        if (
            !updatedProduct.name ||
            !updatedProduct.brand ||
            !updatedProduct.rating ||
            !updatedProduct.reviews ||
            !updatedProduct.image ||
            !updatedProduct.price ||
            !updatedProduct.description
        ) {
            throw new ValidationError("Invalid product data");
        }

        await Product.findByIdAndUpdate(productId, updatedProduct);

        res.status(200).send();
        return;
    } catch (error) {
        next(error);
    }
}
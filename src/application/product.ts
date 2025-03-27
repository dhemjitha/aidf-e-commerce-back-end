import { Request, Response, NextFunction } from "express";
import Product from "../infrastructure/schemas/Product";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import { CreateProductDTO } from "../domain/dtos/product"; 

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
        const product = CreateProductDTO.safeParse(req.body);

        if(!product.success){
            throw new ValidationError(product.error.message);
        }

        await Product.create({
            name: product.data.name,
            brand: product.data.brand,
            image: product.data.image,
            price: parseInt(product.data.price),
            description: product.data.description,
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
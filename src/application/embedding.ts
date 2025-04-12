import { Request, Response, NextFunction } from "express";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import mongoose from "mongoose";
import Product from "../infrastructure/schemas/Product";
import { Document } from "@langchain/core/documents";

export const createEmbeddings = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const embeddingsModel = new OpenAIEmbeddings({
            modelName: "text-embedding-ada-002",
            apiKey: process.env.OPENAI_API_KEY,
        })

        const vectorIndex = new MongoDBAtlasVectorSearch(embeddingsModel, {
            collection: mongoose.connection.collection("productVectors"),
            indexName: "vector_index",
        });

        const products = await Product.find({});

        const docs = products.map((product) => {
            const { _id, brand, price, description } = product;
            const doc = new Document({
                pageContent: `${description} Brand ${brand}. Price per item: ${price}`,
                metadata: {
                    _id,
                },
            });
            return doc;
        })

        await vectorIndex.addDocuments(docs);

        res.status(200).json({
            message: "Embeddings created successfully",
        });

    } catch (error) {
        next(error);
    }
}
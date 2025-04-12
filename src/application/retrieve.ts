import { Request, Response, NextFunction } from "express";
 import Product from "../infrastructure/schemas/Product";
 import mongoose from "mongoose";
 import { OpenAIEmbeddings } from "@langchain/openai";
 import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
 
 export const retrieve = async (
   req: Request,
   res: Response,
   next: NextFunction
 ) => {
   try {
     const { query } = req.query;
     if (!query || query === "") {
       const products = (await Product.find()).map((product) => ({
        product: product,
         confidence: 1,
       }));
 
       res.status(200).json(products);
       return;
     }
 
     const embeddingsModel = new OpenAIEmbeddings({
       model: "text-embedding-ada-002",
       apiKey: process.env.OPENAI_API_KEY,
     });
 
     const vectorIndex = new MongoDBAtlasVectorSearch(embeddingsModel, {
       collection: mongoose.connection.collection("productVectors"),
       indexName: "vector_index",
     });
 
     const results = await vectorIndex.similaritySearchWithScore(
       query as string
     );
 
     console.log(results);
 
     const matchedProducts = await Promise.all(
       results.map(async (result) => {
         const product = await Product.findById(result[0].metadata._id);
         return {
            product: product,
           confidence: result[1],
         };
       })
     );
 
     res
       .status(200)
       .json(
         matchedProducts.length > 3 ? matchedProducts.slice(0, 4) : matchedProducts
       );
     return;
   } catch (error) {
     next(error);
   }
 };
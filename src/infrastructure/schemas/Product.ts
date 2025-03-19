import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    reviews: {
        type: Number,
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
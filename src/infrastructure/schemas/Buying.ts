import mongoose from "mongoose";

const BuyingSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    shippingAddress: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    checkoutDate: {
        type: Date,
        required: true
    }
});

const Buying = mongoose.model("Buying", BuyingSchema);

export default Buying;
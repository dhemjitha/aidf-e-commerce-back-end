import Buying from "../infrastructure/schemas/Buying.js";

export const createBuying = async (req, res) => {

    const buying = req.body;

    if (!buying.productId || !buying.userId || !buying.checkoutDate) {
        return res.status(400).send();
    }

    await Buying.create({
        productId: buying.productId,
        userId: buying.userId,
        checkoutDate: buying.checkoutDate
    });

    res.status(201).send();
    return;
}

export const getAllBuyingsForProduct = async (req, res) => {
    const productId = req.params.productId;
    const buyings = await Buying.find({ productId: productId }).populate("productId").populate("userId");
    res.status(200).json(buyings);
    return;
}

export const getAllBuyings = async (req, res) => {
    const buyings = await Buying.find();
    res.status(200).json(buyings);
    return;
}
import { z } from "zod";

export const CreateBuyingDTO = z.object({
    productId: z.string().min(1, "Product ID is required."),
    userId: z.string().min(1, "User ID is required."),
    quantity: z.number().min(1, "Quantity must be at least 1."),
    shippingAddress: z.string().min(5, "Shipping address must be at least 5 characters long."),
    mobileNumber: z.string(),
    checkoutDate: z.string()
});

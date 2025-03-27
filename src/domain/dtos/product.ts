import { z } from "zod"; 

export const CreateProductDTO = z.object({
    name: z.string(),
    brand: z.string(),
    image: z.string(),
    price: z.string(),
    description: z.string()
});
import { Router } from "express";
import authValidation from "../middlewares/authValidation";
import { validateSchema } from "../middlewares/validateSchema";

const routerProducts = Router();

routerProducts.post('/products', authValidation, validateSchema(schemaProduct), addProduct);

export default routerProducts;
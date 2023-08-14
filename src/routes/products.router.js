import { Router } from "express";
import authValidation from "../middlewares/authValidation.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { addProduct, getProducts, getProductsByUser, updateIsSold, viewProduct } from "../controllers/products.controller.js";
import { schemaProduct } from "../schemas/validate.schema.js";

const routerProducts = Router();

routerProducts.post('/products', authValidation, validateSchema(schemaProduct), addProduct);
routerProducts.get('/products', getProducts);
routerProducts.get('/products/me', authValidation, getProductsByUser);
routerProducts.put('/products/me/:id', authValidation, updateIsSold);
routerProducts.get('/products/info/:id', viewProduct);
export default routerProducts;
import { Router } from "express";
import userRouter from "./user.router.js";
import routerProducts from "./products.router.js";

const router = Router();

router.use(userRouter);
router.use(routerProducts);

export default router;
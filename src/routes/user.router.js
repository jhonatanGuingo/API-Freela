import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaSignIn, schemaSignUp } from "../schemas/validate.schema.js";
import { signIn, signUp } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post('/signin',validateSchema(schemaSignIn), signIn);
userRouter.post('/signup', validateSchema(schemaSignUp), signUp);

export default userRouter;




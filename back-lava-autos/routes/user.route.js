import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/', userController.getAll);
userRouter.post('/', userController.register);

export default userRouter;
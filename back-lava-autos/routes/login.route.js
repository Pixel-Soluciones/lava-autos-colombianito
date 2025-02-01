import { Router } from "express";
import { loginController } from "../controllers/login.controller.js";

const loginRouter = Router();

loginRouter.post('/', loginController.login);

export default loginRouter;
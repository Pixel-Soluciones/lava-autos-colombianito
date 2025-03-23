import { Router } from "express";
import { reportsController } from "../controllers/reports.controller.js";

const reportsRouter = Router();

reportsRouter.get('/daily', reportsController.getDailyReport);
reportsRouter.get('/monthly', reportsController.getMonthlyReport);

export default reportsRouter;
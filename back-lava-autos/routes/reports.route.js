import { Router } from "express";
import { reportsController } from "../controllers/reports.controller.js";

const reportsRouter = Router();

reportsRouter.post('/daily', reportsController.getDailyReport);
reportsRouter.post('/monthly', reportsController.getMonthlyReport);

export default reportsRouter;
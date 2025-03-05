import { Router } from "express";
import { asignedServicesController } from "../controllers/asignedServices.controller.js";

const asignedServicesRouter = Router();

asignedServicesRouter.get('/', asignedServicesController.getAsignedServices);

export default asignedServicesRouter;
import { Router } from "express";
import { vehicleController } from "../controllers/vehicle.controller.js";

const vehiclesRouter = Router();

vehiclesRouter.get("/", vehicleController.getVehicles);

export default vehiclesRouter;
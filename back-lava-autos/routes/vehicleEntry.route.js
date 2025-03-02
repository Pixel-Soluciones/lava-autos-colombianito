import { Router } from "express";
import { vehicleEntryController } from "../controllers/vehicleEntry.controller.js";

const vehicleEntryRouter = Router();

vehicleEntryRouter.get('/', vehicleEntryController.getVehicleEntries);

export default vehicleEntryRouter;
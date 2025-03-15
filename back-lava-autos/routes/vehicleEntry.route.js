import { Router } from "express";
import { vehicleEntryController } from "../controllers/vehicleEntry.controller.js";

const vehicleEntryRouter = Router();

vehicleEntryRouter.get('/', vehicleEntryController.getVehicleEntries);
vehicleEntryRouter.post('/create', vehicleEntryController.createVehicleEntry);
vehicleEntryRouter.post('/update/:id', vehicleEntryController.updateVehicleEntry);
vehicleEntryRouter.post('/cancel/:id', vehicleEntryController.cancelService)
vehicleEntryRouter.post('/checkout/:id', vehicleEntryController.completeService);

export default vehicleEntryRouter;
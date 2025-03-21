import { Router } from "express";
import { vehicleEntryController } from "../controllers/vehicleEntry.controller.js";

const vehicleEntryRouter = Router();

vehicleEntryRouter.get('/', vehicleEntryController.getVehicleEntries);
vehicleEntryRouter.post('/create', vehicleEntryController.createVehicleEntry);
vehicleEntryRouter.post('/update/:id', vehicleEntryController.updateVehicleEntry);
vehicleEntryRouter.delete('/cancel/:id', vehicleEntryController.cancelService)
vehicleEntryRouter.post('/checkout', vehicleEntryController.completeService);

export default vehicleEntryRouter;
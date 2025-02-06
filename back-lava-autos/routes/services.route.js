import { Router } from "express";
import { serviceController } from "../controllers/service.controller.js";
import { validateService, validateServiceId } from "../validators/services.validator.js";

const servicesRouter = Router();

servicesRouter.post('/create', validateService, serviceController.createService);

servicesRouter.put('/update/:id_servicio', validateServiceId, validateService, serviceController.updateService);

servicesRouter.get('/get/:id_servicio', validateServiceId ,serviceController.getServiceById);

servicesRouter.delete('/delete/:id_servicio', validateServiceId ,serviceController.deleteService);

servicesRouter.get('/', serviceController.getServices);

export default servicesRouter;
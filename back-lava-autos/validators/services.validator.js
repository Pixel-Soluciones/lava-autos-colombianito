import { body, param, validationResult } from 'express-validator';

const validateService = [
    body('nombre_servicio').notEmpty().withMessage('Nombre del servicio es requerido'),
    body('descrip_servicio').notEmpty().withMessage('Descripción del servicio es requerida'),
    body('valor_servicio').notEmpty().withMessage('Valor del servicio es requerido'),
    body('tiempo_estimado').notEmpty().withMessage('Tiempo estimado del servicio es requerido'),
];

const validateServiceId = [
    param('id_servicio').notEmpty().withMessage('ID es requerido'),
];

export { validateService, validateServiceId };
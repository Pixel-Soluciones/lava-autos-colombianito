import { validationResult } from 'express-validator';
import Service from '../models/service.model.js';
import { info } from '../utils/logger.js';

const createService = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const service = await Service.create(req.body);
        return res.status(201).json(service);
    } catch (error) {
        return res.status(500).json({
            error: 'Error al registrar el servicio',
            details: error.message
        });
    }
}

const getServices = async (req, res) => {
    try {
        const services = await Service.findAll({
            where: { status: 'active' },
        });
        return res.status(200).json(services);
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener servicios',
            details: error.message
        });
    }
}

const getServiceById = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const service = await Service.findByPk(req.params.id_servicio);
        if (service) {
            return res.status(200).json(service);
        }
        return res.status(404).json({ error: 'Service not found' });
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener el servicio',
            details: error.message
        });
    }
}

const updateService = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const service = await Service.findByPk(req.params.id_servicio);
        if (service) {
            const allowedFields = ['nombre_servicio', 'descrip_servicio', 'valor_servicio', 'tiempo_estimado'];
            const filteredData = Object.keys(req.body)
                .filter(key => allowedFields.includes(key))
                .reduce((obj, key) => {
                    obj[key] = req.body[key];
                    return obj;
                }, {});
            await service.update(filteredData);
            return res.status(200).json(service);
        }
        return res.status(404).json({ error: 'Service not found' });
    } catch (error) {
        return res.status(500).json({
            error: 'Error al actualizar servicio',
            details: error.message
        });
    }
}

const deleteService = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }    
    try {
        const service = await Service.findByPk(req.params.id_servicio);
        if (service) {
            await service.destroy();
            return res.status(204).json();
        }
        return res.status(404).json({ error: 'Service not found' });
    } catch (error) {
        return res.status(500).json({
            error: 'Error al eliminar el servicio',
            details: error.message
        });
    }
}

export const serviceController = {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService
};
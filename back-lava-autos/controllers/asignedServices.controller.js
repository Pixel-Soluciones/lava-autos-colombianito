import AsignedServices from "../models/asignedServices.model.js"
import Service from "../models/service.model.js";

const getAsignedServices = async (req, res) => {
    try {
        const asignedServices = await AsignedServices.findAll({
            include: [
                {
                    model: Service,
                    required: false 
                },
            ]
        });
        return res.status(200).json(asignedServices);
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener servicios asignados',
            details: error.message
        });
    }
}

export const asignedServicesController = {
    getAsignedServices
}
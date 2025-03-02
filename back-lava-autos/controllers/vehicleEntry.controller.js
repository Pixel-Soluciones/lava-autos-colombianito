import VehicleEntry from '../models/vehicleEntry.model.js';

const getVehicleEntries = async (req, res) => {
    try {
        const vehicleEntries = await VehicleEntry.findAll();
        return res.status(200).json(vehicleEntries);
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener entradas de vehículos',
            details: error.message
        });
    }
}

export const vehicleEntryController = {
    getVehicleEntries
}
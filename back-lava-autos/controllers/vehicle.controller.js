import Vehicle from '../models/vehicle.model.js';

const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    return res.status(200).json(vehicles);
  } catch (error) {
    return res.status(500).json({
      error: 'Error al obtener los vehiculos',
      details: error.message
    });
  }
}

export const vehicleController = {
  getVehicles
}
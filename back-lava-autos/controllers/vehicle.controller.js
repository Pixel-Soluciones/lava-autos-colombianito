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

const createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    return res.status(201).json(vehicle);
  } catch (error) {
    return res.status(500).json({
      error: 'Error al crear el vehiculo',
      details: error.message
    });
  }
}

export const vehicleController = {
  getVehicles,
  createVehicle
}
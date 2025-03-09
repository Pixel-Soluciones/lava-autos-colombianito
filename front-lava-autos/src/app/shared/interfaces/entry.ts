import { IServicio } from "app/shared/interfaces/servicio"
import { IEmployee } from "./employee"
import { IVehicle } from "./vehicle"

export interface IEntry{
    Vehicle: IVehicle;
    AsignedServices:  IServicio[]; 
    placa: string;   
    tipo_pago: string;
    estado: string;
}
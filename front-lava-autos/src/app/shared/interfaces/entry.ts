import { IServicio } from "app/shared/interfaces/servicio"
import { IEmployee } from "./employee"
import { IVehicle } from "./vehicle"

export interface IEntry{
    id_ingreso?: number;
    Vehicle: IVehicle;
    AsignedServices: any[]; 
    placa: string;   
    tipo_pago: string;
    estado: string;
}
import { Timestamp } from "rxjs";

export interface IServicio {
    id_servicio?: number;
    nombre_servicio: string;
    descrip_servicio: string;
    valor_servicio: number;
    tiempo_estimado: string;
}
import { Employee } from "./employee";

export const getEntityPropiedades = (entidad: string): Array<any> => {
    let resultados: any = [];
    let clase: any;

    switch (entidad) {
        case 'employees':
            clase = new Employee(); break;
    }

    if (clase) {
        // resultados = Object.keys(clase);
        resultados = Object.keys(clase).map(key => ({ key, value: clase[key] }));
    }
    return resultados
}
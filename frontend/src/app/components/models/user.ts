import { UserTypeI } from '../models/userType';
import { ProgramI } from '../models/program';
export interface UserI {
    id?: number;                      // Opcional, asumiendo que puede ser generado automáticamente
    name: string;                  // Nombre del usuario
    lastName: string;                // Apellido del usuario
    email: string;                   // Correo electrónico del usuario
    program: number;
    name_program?:ProgramI;             // ID del programa (relación con el modelo Programa)
    tipos_usuario?: UserTypeI[];      // Arreglo de IDs de tipos de usuario (relación ManyToMany)
}

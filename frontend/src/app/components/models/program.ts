import { FacultyI } from "./faculty";
export interface ProgramI {
    id?: number;
    facultad:number;
    facultad_nombre: FacultyI;
    program_name: string;
}
import { PublicationTypeI } from "./publicationType";
import { KeywordsI } from "./keywords";
import { investigationGroupI } from "./investigationGruop";
import { UserI } from "./user";

export interface PublicationsI{
    id?:number,
    tipos_publicacion:PublicationTypeI,
    palabras_claves:KeywordsI[],
    titulo:string,
    resumen:string,
    fecha_publicacion:string,
    archivo_pdf: string;  // Agrega el campo para el archivo PDF
    grupo_investigacion: investigationGroupI;
    usuario: UserI;
    tipos_publicacion_info:PublicationTypeI,
    palabras_clave_info:KeywordsI[],
    grupo_investigacion_info:investigationGroupI,
    usuario_info:UserI,

}
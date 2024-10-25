import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgramI } from '../components/models/program'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/facultades/programas/`; // Asegúrate de que la ruta sea correcta

  constructor(
    private http: HttpClient
  ) { }

  getAllPrograms(): Observable<ProgramI[]> {
    return this.http.get<ProgramI[]>(this.base_path);
  }

  getOneProgram(id: number): Observable<ProgramI> {
    return this.http.get<ProgramI>(`${this.base_path}${id}/`);
  }

  createProgram(data: ProgramI): Observable<ProgramI> {
    return this.http.post<ProgramI>(this.base_path, data);
  }

  updateProgram(id: number, data: ProgramI): Observable<ProgramI> {
    return this.http.put<ProgramI>(`${this.base_path}${id}/`, data); // Agregar el '/' al final si es necesario
  }

  deleteProgram(id: number): Observable<ProgramI> {
    return this.http.delete<ProgramI>(`${this.base_path}${id}/`); // Agregar el '/' al final si es necesario
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PublicationsI } from '../components/models/publications';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/publicaciones/`; // Asegúrate de que la ruta sea correcta

  constructor(
    private http: HttpClient
  ) { }

  getAllPublications(): Observable<PublicationsI[]> {
    return this.http.get<PublicationsI[]>(this.base_path);
  }

  getOnePublication(id: number): Observable<PublicationsI> {
    return this.http.get<PublicationsI>(`${this.base_path}${id}`);
  }

  createPublication(data: PublicationsI): Observable<PublicationsI> {
    return this.http.post<PublicationsI>(this.base_path, data);
  }

  updatePublication(id: number, data: PublicationsI): Observable<PublicationsI> {
    return this.http.put<PublicationsI>(`${this.base_path}${id}/`, data); // Asegúrate de que el '/' esté presente al final
  }

  deletePublication(id: number): Observable<PublicationsI> {
    return this.http.delete<PublicationsI>(`${this.base_path}${id}/`); // Asegúrate de que el '/' esté presente al final
  }
}

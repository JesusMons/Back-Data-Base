import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PublicationTypeI } from '../components/models/publicationType';

@Injectable({
  providedIn: 'root'
})
export class PublicationTypesService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/publicaciones/tipos-publicacion/`;

  constructor(
    private http: HttpClient
  ) { }

  getAllPublicationTypes(): Observable<PublicationTypeI[]> {
    return this.http
      .get<PublicationTypeI[]>(this.base_path);
  }

  getOnePublicationType(id: number): Observable<PublicationTypeI> {
    return this.http
      .get<PublicationTypeI>(`${this.base_path}${id}`);
  }

  createPublicationType(data: any): Observable<PublicationTypeI> {
    return this.http.post<PublicationTypeI>(this.base_path, data);
  }

  updatePublicationType(id: number, data: any): Observable<PublicationTypeI> {
    return this.http.put<PublicationTypeI>(`${this.base_path}${id}/`, data);
  }

  deletePublicationType(id: number): Observable<PublicationTypeI> {
    return this.http.delete<PublicationTypeI>(`${this.base_path}${id}`);
  }
}

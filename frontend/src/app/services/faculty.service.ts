
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FacultyI } from '../components/models/faculty';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/facultades/`

  constructor(
    private http:HttpClient
  ) { }

  getAllFacultys():Observable<FacultyI[]>{
    return this.http
      .get<FacultyI[]>(this.base_path)
  }

  getOneFaculty(id: number):Observable<FacultyI>{
    return this.http
      .get<FacultyI>(`${this.base_path}${id}`)
  }



  createFaculty(data: any):Observable<FacultyI>{
    return this.http.post<FacultyI>(this.base_path, data)
  }

  updateFaculty(id: number, data: any): Observable<FacultyI> {
    return this.http.put<FacultyI>(`${this.base_path}${id}/`, data);
  }

  deleteFaculty(id: number): Observable<FacultyI> {
    return this.http.delete<FacultyI>(`${this.base_path}${id}`);
  }
}

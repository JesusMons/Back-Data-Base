import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserI } from '../components/models/user'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/usuarios/`; // Asegúrate de que la ruta sea correcta

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(): Observable<UserI[]> {
    return this.http.get<UserI[]>(this.base_path);
  }

  getOneUser(id: number): Observable<UserI> {
    return this.http.get<UserI>(`${this.base_path}${id}`);
  }

  createUser(data: UserI): Observable<UserI> {
    return this.http.post<UserI>(this.base_path, data);
  }

  updateUser(id: number, data: UserI): Observable<UserI> {
    return this.http.put<UserI>(`${this.base_path}${id}/`, data); // Agregar el '/' al final si es necesario
  }

  deleteUser(id: number): Observable<UserI> {
    return this.http.delete<UserI>(`${this.base_path}${id}/`); // Agregar el '/' al final si es necesario
  }
}

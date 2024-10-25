import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserTypeI } from '../components/models/userType';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/usuarios/tipos-usuario/`

  constructor(
    private http:HttpClient
  ) { }

  getAllUserTypes():Observable<UserTypeI[]>{
    return this.http
      .get<UserTypeI[]>(this.base_path)
  }

  getOneUserType(id: number):Observable<UserTypeI>{
    return this.http
      .get<UserTypeI>(`${this.base_path}${id}`)
  }



  createUserType(data: any):Observable<UserTypeI>{
    return this.http.post<UserTypeI>(this.base_path, data)
  }

  updateUserType(id: number, data: any): Observable<UserTypeI> {
    return this.http.put<UserTypeI>(`${this.base_path}${id}/`, data);
  }

  deleteUserType(id: number): Observable<UserTypeI> {
    return this.http.delete<UserTypeI>(`${this.base_path}${id}`);
  }
}

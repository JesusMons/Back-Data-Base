import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { investigationGroupI } from '../components/models/investigationGruop';
@Injectable({
  providedIn: 'root'
})
export class InvestigationGruopService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/gruposDeInvestigacion/`


  constructor(
    private http:HttpClient
  ) { }
  getAllInvestigationGroups():Observable<investigationGroupI[]>{
    return this.http
      .get<investigationGroupI[]>(this.base_path)
  }

  getOneInvestigationGroup(id: number):Observable<investigationGroupI>{
    return this.http
      .get<investigationGroupI>(`${this.base_path}${id}`)
  }



  createInvestigationGroup(data: any):Observable<investigationGroupI>{
    return this.http.post<investigationGroupI>(this.base_path, data)
  }

  updateInvestigationGroup(id: number, data: any): Observable<investigationGroupI> {
    return this.http.put<investigationGroupI>(`${this.base_path}${id}/`, data);
  }

  deleteInvestigationGroup(id: number): Observable<investigationGroupI> {
    return this.http.delete<investigationGroupI>(`${this.base_path}${id}`);
  }
}

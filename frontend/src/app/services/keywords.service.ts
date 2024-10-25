import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeywordsI } from '../components/models/keywords';
@Injectable({
  providedIn: 'root'
})
export class KeywordsService {
   api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/publicaciones/palabras-clave/`

  constructor(
    private http:HttpClient
  ) { }
  getAllKeywords():Observable<KeywordsI[]>{
    return this.http
      .get<KeywordsI[]>(this.base_path)
  }

  getOneKeyword(id: number):Observable<KeywordsI>{
    return this.http
      .get<KeywordsI>(`${this.base_path}${id}`)
  }



  createKeyword(data: any):Observable<KeywordsI>{
    return this.http.post<KeywordsI>(this.base_path, data)
  }

  updateKeyword(id: number, data: any): Observable<KeywordsI> {
    return this.http.put<KeywordsI>(`${this.base_path}${id}/`, data);
  }

  deleteKeyword(id: number): Observable<KeywordsI > {
    return this.http.delete<KeywordsI>(`${this.base_path}${id}`);
  }
}


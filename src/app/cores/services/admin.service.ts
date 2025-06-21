import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private readonly apiUrl = "https://music-awards-server.onrender.com/api";


  constructor(private http: HttpClient) { }

  //Nominee management
  createNominee(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/nominees`,data)
  }

  updateNominee(id: string, data: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/nominees/${id}`,data)
  }

  deleteNominee(id:string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/nominees/${id}`)
  }


  //Category management
  createCategory(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/categories`,data)
  }


  updateCategory(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/categories/${id}`, {});
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categories/${id}`);
  }

}

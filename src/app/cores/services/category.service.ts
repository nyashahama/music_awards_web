import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Category {
  id: string;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiUrl = 'https://music-awards-server.onrender.com/api';

  constructor(private http: HttpClient) {}

  //Get all categories
  listCategories(): Observable<Category[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`).pipe(
      map((response) =>
        response.map((c) => ({
          id: c.category_id,
          name: c.name,
          description: c.description,
        })),
      ),
    );
  }

  //Get single category
  getCategory(id: string): Observable<Category> {
    return this.http.get<any>(`${this.apiUrl}/categories/${id}`).pipe(
      map((c) => ({
        id: c.category_id,
        name: c.name,
        description: c.description,
      })),
    );
  }

  //Get active categories
  listActiveCategories(): Observable<Category[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories/active`).pipe(
      map((response) =>
        response.map((c) => ({
          id: c.category_id,
          name: c.name,
          description: c.description,
        })),
      ),
    );
  }
}

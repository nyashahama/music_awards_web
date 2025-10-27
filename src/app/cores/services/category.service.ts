import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

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

  // Cache variables
  private categoriesCache$: Observable<Category[]> | null = null;
  private activeCategoriesCache$: Observable<Category[]> | null = null;
  private categoryCache = new Map<string, Observable<Category>>();

  constructor(private http: HttpClient) {}

  // Get all categories
  listCategories(): Observable<Category[]> {
    if (!this.categoriesCache$) {
      this.categoriesCache$ = this.http.get<any[]>(`${this.apiUrl}/categories`).pipe(
        map((response) =>
          response.map((c) => ({
            id: c.category_id,
            name: c.name,
            description: c.description,
          })),
        ),
        shareReplay(1)
      );
    }
    return this.categoriesCache$;
  }

  // Get single category
  getCategory(id: string): Observable<Category> {
    if (!this.categoryCache.has(id)) {
      const category$ = this.http.get<any>(`${this.apiUrl}/categories/${id}`).pipe(
        map((c) => ({
          id: c.category_id,
          name: c.name,
          description: c.description,
        })),
        shareReplay(1)
      );
      this.categoryCache.set(id, category$);
    }
    return this.categoryCache.get(id)!;
  }

  // Get active categories
  listActiveCategories(): Observable<Category[]> {
    if (!this.activeCategoriesCache$) {
      this.activeCategoriesCache$ = this.http.get<any[]>(`${this.apiUrl}/categories/active`).pipe(
        map((response) =>
          response.map((c) => ({
            id: c.category_id,
            name: c.name,
            description: c.description,
          })),
        ),
        shareReplay(1)
      );
    }
    return this.activeCategoriesCache$;
  }

  // Clear cache methods
  clearCategoriesCache(): void {
    this.categoriesCache$ = null;
  }

  clearActiveCategoriesCache(): void {
    this.activeCategoriesCache$ = null;
  }

  clearCategoryCache(id: string): void {
    this.categoryCache.delete(id);
  }

  clearAllCache(): void {
    this.categoriesCache$ = null;
    this.activeCategoriesCache$ = null;
    this.categoryCache.clear();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AwardsService {
  private readonly apiUrl = 'https://music-awards-server.onrender.com/api';

  // Cache variables
  private categoriesCache$: Observable<any> | null = null;
  private categoryCache = new Map<string, Observable<any>>();

  constructor(private http: HttpClient) {}

  listCategories(): Observable<any> {
    if (!this.categoriesCache$) {
      this.categoriesCache$ = this.http.get(`${this.apiUrl}/categories`).pipe(
        map((response: any) =>
          response.map((category: any) => ({
            id: category.category_id || category.id,
            name: category.Name || category.name,
            description: category.Description || category.description,
          })),
        ),
        shareReplay(1)
      );
    }
    return this.categoriesCache$;
  }

  listActivecategories(active: boolean): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/${active}`).pipe(
      shareReplay(1)
    );
  }

  getCategories(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/${id}`).pipe(
      shareReplay(1)
    );
  }

  getCategory(id: string): Observable<any> {
    if (!this.categoryCache.has(id)) {
      const category$ = this.http.get(`${this.apiUrl}/categories/${id}`).pipe(
        map((category: any) => ({
          id: category.CategoryID || category.id,
          name: category.Name || category.name,
          description: category.Description || category.description,
        })),
        shareReplay(1)
      );
      this.categoryCache.set(id, category$);
    }
    return this.categoryCache.get(id)!;
  }

  createCategory(data: any): Observable<any> {
    this.clearCategoriesCache();
    return this.http.post(`${this.apiUrl}/categories`, data);
  }

  updateCategory(id: string): Observable<any> {
    this.clearCategoriesCache();
    this.categoryCache.delete(id);
    return this.http.put(`${this.apiUrl}/categories/${id}`, {});
  }

  deleteCategory(id: string): Observable<any> {
    this.clearCategoriesCache();
    this.categoryCache.delete(id);
    return this.http.delete(`${this.apiUrl}/categories/${id}`);
  }

  // Clear cache methods
  clearCategoriesCache(): void {
    this.categoriesCache$ = null;
  }

  clearCategoryCache(id: string): void {
    this.categoryCache.delete(id);
  }

  clearAllCache(): void {
    this.categoriesCache$ = null;
    this.categoryCache.clear();
  }
}

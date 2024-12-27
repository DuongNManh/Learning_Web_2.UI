import { Injectable } from '@angular/core';
import { CategoryDTO, CategoryModel } from '../models/CategoryModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../core/models/api-response';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private category_base = environment.api_dev_base_url + '/category';

  constructor(private http: HttpClient) { }

  addCategory(model: CategoryDTO): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(this.category_base, model);
  }

  getAllCategories(): Observable<ApiResponse<CategoryModel[]>> {
    return this.http.get<ApiResponse<CategoryModel[]>>(this.category_base);
  }

  getCategoryById(id: string): Observable<ApiResponse<CategoryModel>> {
    return this.http.get<ApiResponse<CategoryModel>>(`${this.category_base}/${id}`);
  }

  updateCategory(id:string, model: CategoryDTO): Observable<ApiResponse<CategoryModel>> {
    return this.http.put<ApiResponse<CategoryModel>>(`${this.category_base}/${id}`, model);
  }

  deleteCategory(id: string): Observable<ApiResponse<CategoryModel>> {
    return this.http.delete<ApiResponse<CategoryModel>>(`${this.category_base}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../core/models/api-response';
import { environment } from '../../../../environments/environment.development';
import { BlogPostDTO, BlogPostModel } from '../models/BlogPostModel';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  private blog_post_base = environment.api_dev_base_url + '/BlogPost';

  constructor(private http: HttpClient) { }

  createBlogPost(model: BlogPostDTO): Observable<ApiResponse<BlogPostModel>> {
    return this.http.post<ApiResponse<BlogPostModel>>(this.blog_post_base, model);
  }

  getAllBlogPosts(): Observable<ApiResponse<BlogPostModel[]>> {
    return this.http.get<ApiResponse<BlogPostModel[]>>(this.blog_post_base);
  }

  getBlogPostById(id: string): Observable<ApiResponse<BlogPostModel>> {
    return this.http.get<ApiResponse<BlogPostModel>>(`${this.blog_post_base}/${id}`);
  }

  updateBlogPost(id: string, model: BlogPostDTO): Observable<ApiResponse<BlogPostModel>> {
    return this.http.put<ApiResponse<BlogPostModel>>(`${this.blog_post_base}/${id}`, model);
  }

  deleteBlogPost(id: string): Observable<ApiResponse<BlogPostModel>>{
    return this.http.delete<ApiResponse<BlogPostModel>>(`${this.blog_post_base}/${id}`);
  }
}

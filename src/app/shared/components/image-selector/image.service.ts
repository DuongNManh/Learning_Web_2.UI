import { Injectable } from '@angular/core';
import { ImageDTO, ImageModel } from '../models/ImageModel';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/models/api-response';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private image_base = environment.api_dev_base_url + '/Image';

  constructor(private http: HttpClient) {
   }

   uploadImage(formData: FormData): Observable<ApiResponse<ImageModel>>{
    return this.http.post<ApiResponse<ImageModel>>(this.image_base, formData);
  }
}

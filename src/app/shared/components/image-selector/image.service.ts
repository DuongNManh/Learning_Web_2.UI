import { Injectable } from '@angular/core';
import { ImageDTO, ImageModel } from '../models/ImageModel';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from '../../../core/models/api-response';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private image_base = environment.api_dev_base_url + '/Image';
  selectedImage: BehaviorSubject<ImageModel> = new BehaviorSubject<ImageModel>({
    id: '',
    fileName: '',
    fileExtension: '',
    title: '',
    url: '',
    dateCreated: new Date()
  });

  constructor(private http: HttpClient) {
   }

  uploadImage(formData: FormData): Observable<ApiResponse<ImageModel>>{
    return this.http.post<ApiResponse<ImageModel>>(this.image_base, formData);
  }

  getAllImages(): Observable<ApiResponse<ImageModel[]>> {
    return this.http.get<ApiResponse<ImageModel[]>>(this.image_base);
  }

  //this method is used to select an image and emit it to the subscribers
  selectImage(image: ImageModel): void {
    this.selectedImage.next(image);
  }

  onSelectedImage(): Observable<ImageModel> {
    return this.selectedImage?.asObservable();
  }
    
}

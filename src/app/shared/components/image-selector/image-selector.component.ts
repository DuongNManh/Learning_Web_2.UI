import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageDTO, ImageModel } from '../models/ImageModel';
import { FormsModule } from '@angular/forms';
import { ImageService } from './image.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent {
  imageDTO: ImageDTO = {
    file: null as unknown as File,
    file_name: '',
    title: ''
  };
  selectedImage?: ImageModel;
  uploadSubscription?: Subscription;
  previewUrl?: string;

  constructor(
    private imageService: ImageService
  ) {}

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      const file = element.files[0];
      this.imageDTO.file = file;
      this.imageDTO.file_name = file.name;
      
      this.createPreviewUrl(file);
    }
  }

  private createPreviewUrl(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  uploadImage() {
    if (!this.imageDTO.file || !this.imageDTO.title) {
      console.error('File or title missing');
      return;
    }

    const formData = new FormData();
    formData.append('File', this.imageDTO.file, this.imageDTO.file.name);
    formData.append('FileName', this.imageDTO.file_name);
    formData.append('Title', this.imageDTO.title);

    console.log('Uploading image', formData);

    this.uploadSubscription = this.imageService.uploadImage(formData).subscribe({
      next: (response) => {
        this.selectedImage = response.data;
        this.resetForm();
      },
      error: (error) => {
        console.error('Error uploading image', error);
      }
    });
  }

  private resetForm(): void {
    this.imageDTO = {
      file: null as unknown as File,
      file_name: '',
      title: ''
    };
    this.previewUrl = undefined;
  }

  ngOnDestroy() {
    if (this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    }
  }

  onDelete(): void {
    if (this.selectedImage?.id) {
      // Implement delete logic here using the image service
      // this.imageService.deleteImage(this.selectedImage.id).subscribe(...)
    }
  }
}

import { Component, OnInit,ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
export class ImageSelectorComponent implements OnInit, AfterViewInit {
  imageDTO: ImageDTO = {
    file: null as unknown as File,
    file_name: '',
    title: ''
  };
  selectedImage?: ImageModel;
  uploadSubscription?: Subscription;
  previewUrl?: string;
  images?: ImageModel[] = [];
  canScrollLeft = false;
  canScrollRight = false;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.loadImages();
  }

  ngAfterViewInit() {
    this.checkScrollButtons();
    // Add scroll event listener to update button visibility
    this.imageContainer.nativeElement.addEventListener('scroll', () => {
      this.checkScrollButtons();
    });
  }

  private loadImages(): void {
    this.imageService.getAllImages().subscribe({
      next: (response) => {
        if (response.is_success) {
          this.images = response.data;
          // Check scroll buttons after images are loaded
          setTimeout(() => this.checkScrollButtons(), 0);
        }
        console.log('Images', this.images);
      },
      error: (error) => {
        console.error('Error fetching images', error);
      }
    });
  }

  private checkScrollButtons(): void {
    const container = this.imageContainer.nativeElement;
    this.canScrollLeft = container.scrollLeft > 0;
    this.canScrollRight = container.scrollLeft < (container.scrollWidth - container.clientWidth);
  }

  scrollImages(direction: 'prev' | 'next'): void {
    const container = this.imageContainer.nativeElement;
    const scrollAmount = container.offsetWidth * 0.8; // Scroll by 80% of the container's width

    const targetScroll = direction === 'prev' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });

    // Update button visibility after scrolling
    setTimeout(() => this.checkScrollButtons(), 100);
  }

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
        this.loadImages();
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

  onSelected(image: ImageModel): void {
      this.selectedImage = image;
      this.imageService.selectImage(image);
      console.log('Selected image', image);
  }
  
  @ViewChild('imageContainer') imageContainer!: ElementRef;

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { BlogPostDTO, BlogPostModel } from '../models/BlogPostModel';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { CategoryModel } from '../../category/models/CategoryModel';
import { ImageSelectorComponent } from "../../../shared/components/image-selector/image-selector.component";
import { ImageService } from '../../../shared/components/image-selector/image.service';


@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    MarkdownModule,
    ImageSelectorComponent
  ],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit, OnDestroy{
    successMessage: string = '';
    errorMessage: string = '';
    private blogSubmitSubscription?: Subscription;
    private categoriesSubscription?: Subscription;
    private imageSubscription?: Subscription;
    model: BlogPostDTO;
    categories?: CategoryModel[] = [];
    isEditMode = false;
    blogPostId?: string; //for edit mode, we got the id from the route
    isDeleting: boolean = false;
    isImageSelectorVisible: boolean = false;

    constructor(private router: Router, 
      private blogPostService: BlogPostService,
      private categoryService: CategoryService,
      private imageService: ImageService,
      private route: ActivatedRoute) {
        this.model = {
            title: '',
            short_description: '',
            content: '',
            author: '',
            featured_image_url: '',
            url_handle: '',
            publish_date: new Date(),
            is_visible: true,
            categories: []
        };
    }
  ngOnDestroy(): void {
    this.blogSubmitSubscription?.unsubscribe();
    this.categoriesSubscription?.unsubscribe();
    this.imageSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.categoriesSubscription = this.categoryService.getAllCategories()
    .subscribe({
      next: (response) => {
        this.categories = response.data;
      }
    });

    this.route.paramMap.subscribe(params => {
      this.blogPostId = params.get('id')?.toString();
      if (this.blogPostId) {
        this.isEditMode = true;
        this.loadBlogPost(this.blogPostId);
      }
    });

    this.imageSubscription = this.imageService.onSelectedImage()
      .subscribe({
        next: (image) => {
          if(image && this.model){
            this.model.featured_image_url = image.url;
            this.isImageSelectorVisible = false;
          }
        }
      });

  }

  onImageSelectorOpen(event: Event): void {
    event.preventDefault();
    this.isImageSelectorVisible = true;
  }

    onFormSubmit(): void {
      const request = this.isEditMode 
        ? this.blogPostService.updateBlogPost(this.blogPostId!, this.model)
        : this.blogPostService.createBlogPost(this.model);

      this.blogSubmitSubscription = request.subscribe({
        next: (response) => {
          if(response.is_success){
            console.log(this.model);
            this.successMessage = response.message;
            setTimeout(() => {
              this.goBack();
            }, 2000);
          } else {
            this.errorMessage = response.message || "An error occurred"; 
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.errorMessage = error.message || 'An error occurred';
        },
      });

    }

    deleteBlogPost(): void {
      if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
        return;
      }

      if(this.blogPostId) {
        this.isDeleting = true;
        this.errorMessage = '';
        
        this.blogPostService.deleteBlogPost(this.blogPostId).subscribe({
          next: (response) => {
            if(response.is_success){
              this.successMessage = response.message;
              setTimeout(() => {
                this.goBack();
              }, 2000);
            } else {
              this.errorMessage = response.message || "An error occurred"; 
            }
          },
          error: (error) => {
            console.error('Error:', error);
            this.errorMessage = error.message || 'An error occurred';
          },
          complete: () => {
            this.isDeleting = false;
          }
        });
      }
    }

    goBack() {
    this.router.navigate(['/admin/blog-posts']);
    }

    loadBlogPost(id: string): void {
      this.blogPostService.getBlogPostById(id).subscribe({
        next: (response) => {
          // Map BlogPostModel to BlogPostDTO
          const blogPost = response.data;
          if(blogPost){
            this.model = {
            title: blogPost.title,
            short_description: blogPost.short_description,
            content: blogPost.content,
            featured_image_url: blogPost.featured_image_url,
            url_handle: blogPost.url_handle,
            publish_date: blogPost.publish_date,
            author: blogPost.author,
            is_visible: true, // Set default or get from API if available
            categories: blogPost.categories.map(category => category.id) // Extract category IDs
          };
          console.log(this.model);
        }},
        error: (error) => {
          this.errorMessage = 'Error loading blog post';
          console.error(error);
        }
      });
    }
}

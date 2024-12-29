import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { BlogPostDTO } from '../models/BlogPostModel';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { CategoryModel } from '../../category/models/CategoryModel';


@Component({
  selector: 'app-add-blogpost',
  imports: [
    RouterModule,
    NgIf,
    FormsModule,
    CommonModule,
    MarkdownModule
  ],
  standalone: true,
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit{
    successMessage: string = '';
    errorMessage: string = '';
    private blogSubmitSubscription?: Subscription;
    model: BlogPostDTO;
    categories?: CategoryModel[] = [];

    constructor(private router: Router, 
      private blogPostService: BlogPostService,
      private categoryService: CategoryService) {
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
  ngOnInit(): void {
    this.categoryService.getAllCategories()
    .subscribe({
      next: (response) => {
        this.categories = response.data,
        console.log('Categories:', response.data);
      }
    });

  }

    onFormSubmit(): void {
      // Call the service to add the blog post
      console.log(this.model);
      // this.blogSubmitSubscription = this.blogPostService.createBlogPost(this.model)
      // .subscribe({
      //   next: (response) =>{
      //     if(response.is_success){
      //       this.successMessage = response.message;
      //       setTimeout(() => {
      //         this.goBack();
      //       }, 2000);
      //     } else {
      //       this.errorMessage = response.message || "An error occurred while adding the blog post."; 
      //     }
      //   },
      //   error: (error) => {
      //     console.error('Error adding blog post:', error);
      //     this.errorMessage = error.message || 'An error occurred while adding the blog post.';
      //   },
      // })

    }

    goBack() {
    this.router.navigate(['/admin/blog-posts']);
    }
}

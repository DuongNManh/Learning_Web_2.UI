import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { BlogPostDTO } from '../models/BlogPostModel';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-blogpost',
  imports: [
    RouterModule,
    NgIf,
    FormsModule
  ],
  standalone: true,
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent {
    successMessage: string = '';
    errorMessage: string = '';
    model: BlogPostDTO;

    constructor(private router: Router) {
        this.model = {
            title: '',
            short_description: '',
            content: '',
            author: '',
            featured_image_url: '',
            url_handle: '',
            publish_date: new Date(),
            is_visible: true,
        };
    }

    onFormSubmit(): void {
      // Call the service to add the blog post
      console.log(this.model);
    }

    goBack() {
    this.router.navigate(['/admin/blog-posts']);
    }
}

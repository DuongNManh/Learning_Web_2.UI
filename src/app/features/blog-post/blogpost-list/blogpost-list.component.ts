import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgIf,NgFor, AsyncPipe } from '@angular/common';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPostModel } from '../models/BlogPostModel';

@Component({
  selector: 'app-blogpost-list',
  imports: [
    RouterModule,
    NgIf,
    NgFor,
    AsyncPipe
  ],
  standalone: true,
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent {
  blogPosts$;
  
  constructor(private BlogPostService: BlogPostService) {
    this.blogPosts$ = this.BlogPostService.getAllBlogPosts();
  }
}

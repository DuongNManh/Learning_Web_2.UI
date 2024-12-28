import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { CategoryModel } from '../models/CategoryModel';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, NgIf, AsyncPipe],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  categories$;

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getAllCategories();
  }
}

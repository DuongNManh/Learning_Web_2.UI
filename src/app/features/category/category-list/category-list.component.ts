import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { CategoryModel } from '../models/CategoryModel';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, NgIf],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{

  categories?: CategoryModel[];

  constructor(private categoryService: CategoryService) { }
 
  ngOnInit(): void {
    this.categoryService.getAllCategories()
    .subscribe(
      {
        next: (response) =>
          this.categories = response.data,
      }
    );
  }
}

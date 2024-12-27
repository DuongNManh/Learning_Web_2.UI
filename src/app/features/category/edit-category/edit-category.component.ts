import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { CategoryDTO,CategoryModel } from '../models/CategoryModel';
import { NgIf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-category',
  imports: [NgIf, FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramSubcription?: Subscription;
  categoryToUpdate?: CategoryModel;
  editSubcription?: Subscription;
  deleteSubcription?: Subscription;
  successMessage = '';
  errorMessage = '';
  
  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router) { 
  }

  ngOnInit(): void {
    this.paramSubcription = this.route.params.subscribe({
      next: (params) => {
       this.id = params['id'];

       if (this.id) {
         // Call the service to get the category by id
          this.categoryService.getCategoryById(this.id).subscribe({
            next: (response) => {
              if (response.is_success) {
                // Set the category model
                const categoryModel = response.data;
                // Set the category model
                this.categoryToUpdate = categoryModel;
              }
            }
          });
       }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.paramSubcription) {
      this.paramSubcription.unsubscribe();
    }
    if (this.editSubcription) {
      this.editSubcription.unsubscribe();
    }
    if (this.deleteSubcription) {
      this.deleteSubcription.unsubscribe();
    }
  }

  goBack(): void {
    // Navigate to the category list
    setTimeout(() => {
      this.router.navigate(['/admin/categories']);
    }, 2000);
  }

  onFormSubmit(): void {
    const categoryDTO: CategoryDTO = {
      name: this.categoryToUpdate?.name || '',
      url_handle: this.categoryToUpdate?.url_handle || '',
    };
    
    if (this.id) {
      this.editSubcription = this.categoryService.updateCategory(this.id, categoryDTO).subscribe({
        next: (response) => {
          if (response.is_success) {
            this.successMessage = 'Category updated successfully!';
            this.errorMessage = '';
            this.goBack();
          } else {
            // Handle case where is_success is false but it's not an error
            this.errorMessage = response.reason || response.message;
            this.successMessage = '';
          }
        },
        error: (error) => {
          this.errorMessage = error.reason || 'An error occurred while updating the category';
          this.successMessage = '';
        }
      });
    }
  }

  deleteCategory(): void {
    this.deleteSubcription = this.categoryService.deleteCategory(this.id || '').subscribe({
      next: (response) => {
        if (response.is_success) {
          this.successMessage = 'Category deleted successfully!';
          this.errorMessage = '';
          this.goBack();
        } else {
          // Handle case where is_success is false but it's not an error
          this.errorMessage = response.reason || response.message;
          this.successMessage = '';
        }
      },
      error: (error) => {
        this.errorMessage = error.reason || 'An error occurred while deleting the category';
        this.successMessage = '';
      }
    });
  }
}

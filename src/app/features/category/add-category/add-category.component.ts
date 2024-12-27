import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryDTO } from '../models/CategoryModel';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy {
  model: CategoryDTO;
  private addCategorySubscription?: Subscription;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.model = { name: '', url_handle: '' };
  }

  onFormSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.addCategorySubscription = this.categoryService.addCategory(this.model)
      .subscribe({
        next: (response) => {
          if (response.is_success) {
            this.successMessage = response.message;
            // Optionally navigate after a delay
            setTimeout(() => {
              this.router.navigate(['/admin/categories']);
            }, 2000);
          } else {
            this.errorMessage = response.reason || response.message;
          }
        },
        error: (error) => {
          console.error('Error adding category:', error);
          this.errorMessage = error.message || 'An error occurred while adding the category.';
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
  //what is this for?
  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}

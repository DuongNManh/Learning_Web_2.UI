import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-blogpost-list',
  imports: [
    RouterModule,
    NgIf
  ],
  standalone: true,
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent {

}

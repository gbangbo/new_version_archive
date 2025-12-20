import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { topCategories } from '../../../../../shared/data/dashboard/e-commerce';

@Component({
  selector: 'app-top-categories',
  imports: [CommonModule, RouterModule],
  templateUrl: './top-categories.component.html',
  styleUrl: './top-categories.component.scss'
})

export class TopCategoriesComponent {

  public topCategories = topCategories;

}

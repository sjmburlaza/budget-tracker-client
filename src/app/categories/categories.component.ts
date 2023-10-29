import { Component, OnInit } from '@angular/core';
import { CATEGORY_EXPENSES, CATEGORY_INCOME } from '../shared/constants/categories.const';

@Component({
  selector: 'bt-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoryList: any = [];
  openModal = false;
  headerTitle = '';

  constructor() {}

  ngOnInit() {
    this.categoryList.push(...CATEGORY_INCOME, ...CATEGORY_EXPENSES);
  }

  addNewCategory(): void {
    this.openModal = true;
    this.headerTitle = 'Add New Category';
  }

  closeModal(): void {
    this.openModal = false;
  }

}

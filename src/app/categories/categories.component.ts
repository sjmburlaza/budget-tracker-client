import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Category, UserService } from '../_services/user.service';
import { AddCategoryComponent } from './add-category/add-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [DialogService]
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private userService: UserService,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.userService.getDetails().subscribe(data => {
      const categories = data.categories;
      this.categories.push(...categories);
    });
  }


  show() {
    const ref = this.dialogService.open(AddCategoryComponent, {
        width: window.innerWidth > 400 ? "30%" : "90%",
        contentStyle: {"min-width": "300px"},
        baseZIndex: 10000,
        closable: false
    });
  }

}

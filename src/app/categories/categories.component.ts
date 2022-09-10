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
        width: this.getDialogWidth(),
        contentStyle: {"min-width": "300px"},
        baseZIndex: 10000,
        closable: false
    });
  }

  getDialogWidth(): string {
    if (window.innerWidth < 400) {
      return "90%"
    } else if (window.innerWidth > 400 && window.innerWidth < 700) {
      return "60%"
    }

    return "30%"
  }

}

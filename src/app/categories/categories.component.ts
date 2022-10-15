import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Category, UserService } from '../_services/user.service';

interface CategoryNull {
  name: null,
  type: null
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class CategoriesComponent implements OnInit {

  categoryDialog: boolean = false;
  isSuccessful = false;
  isNew = false;
  isForUpdate = false;
  categories: Category[] = [];
  category: Category | CategoryNull = {
    name: '',
    type: '',
  }

  constructor(
    private userService: UserService,
    public dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.userService.getDetails().subscribe(data => {
      const categories: Category[] = data.categories;
      console.log(categories)
      this.categories = categories.reverse();
    });
  }

  createNew(): void {
    this.isNew = true;
    this.isForUpdate = false;
    this.category = {
      name: null,
      type: null,
    };
    this.isSuccessful = false;
    this.categoryDialog = true;
  }

  updateCategory(category: Category): void {
    this.isNew = false;
    this.isForUpdate = true;
    this.category = {...category};
    this.isSuccessful = false;
    this.categoryDialog = true;
  }

  onSubmit(): void {
    let { name, type } = this.category;

    if (!name || !type) {
      return;
    }
    name = name.trim();

    if (this.isNew) {
      this.userService.addCategory(this.category as Category).subscribe( data => {
        console.log(data);
        this.isSuccessful = true;
        this.getCategories();
        this.categoryDialog = false;
      });
    } else if (this.isForUpdate) {
      this.userService.updateCategory(this.category as Category).subscribe( data => {
        console.log(data);
        this.isSuccessful = true;
        this.getCategories();
        this.categoryDialog = false;
      });
    }
  }

  close() {
    this.categoryDialog = false;
  }

}

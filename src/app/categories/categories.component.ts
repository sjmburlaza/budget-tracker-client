import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Category, UserService } from '../_services/user.service';
import { AddCategoryComponent } from './add-category/add-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class CategoriesComponent implements OnInit {

  categoryDialog: boolean = false;
  isSuccessful = false;
  categories: Category[] = [];
  category: Category = {
    name: '',
    type: '',
  }

  constructor(
    private userService: UserService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.userService.getDetails().subscribe(data => {
      const categories: Category[] = data.categories;
      console.log(categories)
      this.categories = categories;
    });
  }

  createNew(): void {
    const ref = this.dialogService.open(AddCategoryComponent, {
      width: '450px',
      contentStyle: {"min-width": "300px"},
      baseZIndex: 10000,
      closable: false
    });
  }

  updateCategory(category: Category): void {
    this.category = {...category};
    this.categoryDialog = true;
  }

  onSubmit(): void {
    console.log(this.category)
    let { name, type } = this.category;
    name = name.trim();

    if (!name || !type) {
      return;
    }
    this.userService.updateCategory( this.category as Category).subscribe( data => {
      console.log(data);
      this.isSuccessful = true;
    });
    this.categoryDialog = false;
    window.location.reload();
  }

  close() {
    this.categoryDialog = false;
  }

}

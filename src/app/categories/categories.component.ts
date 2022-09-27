import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Category, UserService } from '../_services/user.service';
import { AddCategoryComponent } from './add-category/add-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [DialogService, MessageService]
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  category: Category | undefined;

  constructor(
    private userService: UserService,
    public dialogService: DialogService,
    private messageService: MessageService
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

  showConfirm(category: Category) {
    console.log(category)
    this.messageService.clear();
    this.messageService.add({
      key: 'c', 
      sticky: true, 
      severity:'warn', 
      summary:'Are you sure?', 
      detail:'Confirm to proceed',
      closable: false,
    });
  }

  onConfirm() {
    console.log(this.category)
    this.messageService.clear('c');
  }

  onReject() {
      this.messageService.clear('c');
  }

}

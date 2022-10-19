import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Record, Category, UserService } from '../_services/user.service';

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
  records: Record[] = [];
  categories: Category[] = [];
  category: Category | CategoryNull = {
    name: '',
    type: '',
  }
  searchText: any;

  constructor(
    private userService: UserService,
    public dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.userService.getDetails().subscribe(data => {
      const categories: Category[] = data.categories;
      this.records = data.records;
      console.log(data.records)
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
        this.getUserDetails();
        this.categoryDialog = false;
      });
    } else if (this.isForUpdate) {
      const categoryToUpdate: any = this.category;
      const recordsToUpdate = this.records.filter(rec => rec.categoryId === categoryToUpdate._id);
      const recs = recordsToUpdate.map(rec => {
          if (rec.categoryName !== categoryToUpdate.name) {
            return rec.categoryName = categoryToUpdate.name;
          }
          if (rec.categoryType !== categoryToUpdate.type) {
            return rec.categoryType = categoryToUpdate.type;
          }
        })
        
      recordsToUpdate.forEach(record => {
        console.log(recs)
        this.userService.updateRecord(record as Record).subscribe( data => {
          this.getUserDetails();
        });
      })

      this.userService.updateCategory(this.category as Category).subscribe( data => {
        console.log(data);
        this.isSuccessful = true;
        this.getUserDetails();
        this.categoryDialog = false;
      });
    }
  }

  close() {
    this.categoryDialog = false;
  }

}

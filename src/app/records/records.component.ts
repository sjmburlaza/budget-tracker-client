import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Category, Record, UserService } from '../_services/user.service';
import { AddRecordComponent } from './add-record/add-record.component';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class RecordsComponent implements OnInit {

  recordDialog: boolean = false;
  isSuccessful = false;
  categories: Category[] = [];
  categoryNames: any = [];
  records: Record[] = [];
  record: Record = {
    categoryName: '',
    categoryType: '',
    description: '',
    amount: 0
  }

  constructor(
    private userService: UserService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords(): void {
    this.userService.getDetails().subscribe(data => {
      const categories: Category[] = data.categories;
      const records: Record[] = data.records;
      const activeRecords = records.filter(r => r.isDeleted === false)
      activeRecords.forEach(a => {
        return a.createdOn = moment(a.createdOn).format('ll')
      })
      this.records.push(...activeRecords);
      this.categories = categories;
    })
  }

  onCategoryTypeChange(): void {
    this.categoryNames = [];

    if (this.record.categoryType === 'Income') {
      this.categories.forEach(a => {
        if (a.type === 'Income') {
          this.categoryNames.push(a.name);
        }
      });
    } else if (this.record.categoryType === 'Expense') {
      this.categories.forEach(a => {
        if (a.type === 'Expense') {
          this.categoryNames.push(a.name);
        }
      });
    }
  }

  createNew() {
    const ref = this.dialogService.open(AddRecordComponent, {
        width: '450px',
        contentStyle: {"min-width": "300px"},
        baseZIndex: 10000,
        closable: false
    });
  }

  updateRecord(record: Record): void {
    this.record = {...record};
    this.onCategoryTypeChange();
    this.recordDialog = true;
  }

  getCategoryId(name: string, type: string): string {
    const cat = this.categories.find(c => c.name === name && c.type === type)
    if (cat && cat.id) {
      return cat.id;
    }
    return 'none';
  }

  onSubmit(): void {
    let { categoryName, categoryType, description, amount } = this.record;
    const categoryId = this.getCategoryId(categoryName, categoryType);
    description = description.trim();

    if (!categoryName || !categoryType || !description || !amount){
      return;
    }
    this.userService.updateRecord(this.record as Record)
    .subscribe(data => {
      this.isSuccessful = true;
    });

    this.recordDialog = false;
    this.getRecords();
  }

  deleteRecord(record: Record): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + record.categoryName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.updateRecord(record as Record)
        .subscribe( data => {
          console.log(data)
          this.isSuccessful = true;
          window.location.reload();
        });
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Record Deleted', life: 3000});
      }
    });
  }

  close() {
    this.recordDialog = false;
  }

}

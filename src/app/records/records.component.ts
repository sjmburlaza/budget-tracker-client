import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Category, Record, UserService } from '../_services/user.service';

interface RecordNull {
  categoryName: null,
  categoryType: null,
  description: null,
  amount: null
}

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class RecordsComponent implements OnInit {

  recordDialog: boolean = false;
  isSuccessful = false;
  isNew = false;
  isForUpdate = false;
  categories: Category[] = [];
  categoryNames: any = [];
  selectedCategoryType: string = 'All';
  records: Record[] = [];
  recordsCopy: Record[] = [];
  record: Record | RecordNull = {
    categoryName: '',
    categoryType: '',
    description: '',
    amount: 0
  }
  searchText: any;

  constructor(
    private userService: UserService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {  }

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
    this.userService.getDetails().subscribe(data => {
      const categories: Category[] = data.categories;
      const records: Record[] = data.records;
      const activeRecords = records.filter(r => r.isDeleted === false);
      activeRecords.map(a => {
        return a.createdOn = moment(a.createdOn).format('ll')
      });
      this.recordsCopy = activeRecords;
      this.records = activeRecords;
      this.getBalance();
      this.categories = categories;
    })
  }

  getBalance(): void {
    const balance: number[] = [];
    this.records.map(a => {
      if(a.categoryType === 'Income'){
        balance.push(a.amount)
      } else if (a.categoryType === 'Expense'){
        balance.push(-Math.abs(a.amount))
      }

      return a.balance = balance.reduce((accumulator, currentValue) => {
        return (accumulator + currentValue)
      }, 0)
    })
  }

  onCategoryTypeSelect(): void {
    if (this.selectedCategoryType === 'Income') {
      this.records = this.recordsCopy.filter(record => record.categoryType === 'Income');
      this.getBalance();
    } else if (this.selectedCategoryType === 'Expense') {
      this.records = this.recordsCopy.filter(record => record.categoryType === 'Expense');
      this.getBalance();
    } else {
      this.records = this.recordsCopy;
      this.getBalance();
    }
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
    this.isNew = true;
    this.isForUpdate = false;
    this.record = {
      categoryName: null,
      categoryType: null,
      description: null,
      amount: null
    };
    this.isSuccessful = false;
    this.onCategoryTypeChange();
    this.recordDialog = true;
  }

  updateRecord(record: Record): void {
    this.isNew = false;
    this.isForUpdate = true;
    this.record = {...record};
    this.isSuccessful = false;
    this.onCategoryTypeChange();
    this.recordDialog = true;
  }

  getCategoryId(name: string, type: string): string {
    const cat: any = this.categories.find(c => c.name === name && c.type === type);
    if (cat && cat._id) {
      return cat._id;
    }
    return 'none';
  }

  onSubmit(): void {
    let { categoryName, categoryType, description, amount } = this.record;

    if (!categoryName || !categoryType || !description || !amount){
      return;
    }
    const categoryId = this.getCategoryId(categoryName, categoryType);
    description = description.trim();

    if (this.isNew) {
      this.userService.addRecord({categoryName, categoryType, categoryId, description, amount} as Record)
      .subscribe( data => {
        console.log(data);
        this.isSuccessful = true;
        this.recordDialog = false;
        this.fetchUserDetails();
      });
    } else if (this.isForUpdate) {
      this.userService.updateRecord(this.record as Record).subscribe(data => {
        this.isSuccessful = true;
        this.recordDialog = false;
        this.fetchUserDetails();
      });
    }
  }

  deleteRecord(record: Record): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + record.categoryName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteRecord(record as Record).subscribe( data => {
          console.log(data)
          this.isSuccessful = true;
          this.fetchUserDetails();
        });
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Record Deleted', life: 3000});
      }
    });
  }

  close() {
    this.recordDialog = false;
  }

}

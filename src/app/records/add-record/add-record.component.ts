import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Category, Record, UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {

  form: any = {
    type: null,
    name: null,
    description: null,
    amount: null
  };
  isSuccessful = false;

  categories: Category[] = [];
  records: Record[] = [];
  categoryNames: any = [];
  // newBalance: number = 0;

  constructor(
    public ref: DynamicDialogRef,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getDetails();
  }

  onCategoryTypeChange(): void {
    this.categoryNames = [];

    if (this.form.type === 'Income') {
      this.categories.forEach(a => {
        if (a.type === 'Income') {
          this.categoryNames.push(a.name)
        }
      })
    } else if (this.form.type === 'Expense') {
      this.categories.forEach(a => {
        if (a.type === 'Expense') {
          this.categoryNames.push(a.name)
        }
      })
    }
  }

  getDetails(): void {
    this.userService.getDetails().subscribe(data => {
      this.categories = data.categories;
      this.records = data.records
    });
  }

  getBalance(type:string, amount:number): number {
    let origBalance: number | undefined = 0;
    let newBalance: number = 0;

    const lastItem = this.records[this.records.length-1];
    origBalance = lastItem ? lastItem.balance : 0;

    if (origBalance) {
      if (type === 'Income') {
        newBalance = +origBalance + +amount;
      } else if (type === 'Expense') {
        newBalance = +origBalance - +amount;
      }
    }
    return newBalance;
  }
  
  onSubmit(): void {
    let { name, type, description, amount } = this.form;
    let balance: number = this.getBalance(type, amount);
    balance = balance ? balance : amount;
    description = description.trim();

    if (!description || !amount){
      return;
    }
    this.userService.addRecord({name, type, description, amount, balance} as Record)
    .subscribe( data => {
      console.log(data);
      this.isSuccessful = true;
    });

    this.ref.close();
    window.location.reload();
  }

  close(): void {
    this.ref.close();
  }

}

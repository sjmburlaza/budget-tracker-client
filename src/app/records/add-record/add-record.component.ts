import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Category, Record, UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {

  record: any = {
    categoryType: null,
    categoryName: null,
    description: null,
    amount: null
  };
  isSuccessful = false;

  categories: Category[] = [];
  records: Record[] = [];
  categoryNames: any = [];

  constructor(
    public ref: DynamicDialogRef,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getDetails();
  }

  onCategoryTypeChange(): void {
    this.categoryNames = [];

    if (this.record.categoryType === 'Income') {
      this.categories.forEach(a => {
        if (a.type === 'Income') {
          this.categoryNames.push(a.name)
        }
      })
    } else if (this.record.categoryType === 'Expense') {
      this.categories.forEach(a => {
        if (a.type === 'Expense') {
          this.categoryNames.push(a.name)
        }
      })
    }
  }

  getDetails(): void {
    this.userService.getDetails().subscribe(data => {
      this.categories = data.categories.map((c: any) => {
        return {
          name: c.name,
          type: c.type,
          id: c._id,
        }
      });
      console.log(this.categories)
      this.records = data.records;
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
    console.log('categoryId', categoryId)
    description = description.trim();

    if (!categoryName || !categoryType || !description || !amount){
      return;
    }
    this.userService.addRecord({categoryName, categoryType, categoryId, description, amount} as Record)
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

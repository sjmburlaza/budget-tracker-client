import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { Record, UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-category-breakdown',
  templateUrl: './category-breakdown.component.html',
  styleUrls: ['./category-breakdown.component.css']
})
export class CategoryBreakdownComponent implements OnInit {

  records: Record[] = [];
  rangeDates: Date[] = [];
  incomeRecords: Record[] = [];
  expenseRecords: Record[] = [];

  public incomePieChart: Chart | undefined;
  public expensePieChart: Chart | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.rangeDates = [new Date(2022, 7, 1), new Date()];
    this.getDetails();
  }

  ngAfterViewInit(): void {
    this.onSelect();
  }

  getDetails(): void {
    this.userService.getDetails().subscribe(data => {
      const records: Record[] = data.records;
      const activeRecords = records.filter(r => r.isDeleted === false);
      this.records = activeRecords;
      const firstRecordDate = activeRecords[0].createdOn;
      if (firstRecordDate) {
        this.rangeDates = [new Date(firstRecordDate), new Date()];
      }
    });
  }

  populateChart(): void {
    this.onSelect();
  }

  onSelect(): void {
    if (this.rangeDates && this.rangeDates[1]) {
      this.onDateSelect(this.rangeDates[0], this.rangeDates[1]);
      this.getIncomeData();
      this.getExpenseData();
    }
  }

  getNamesAndAmounts(records: Record[]): {name:string, amount: number}[] {
    const namesAndAmounts: {name:string, amount: number}[] = [];
    records.forEach(record => {
      let obj: {name:string, amount: number} = {name:'', amount: 0};
      if (!namesAndAmounts.find(n => n.name === record.categoryName)) {
        obj.name = record.categoryName;
        obj.amount = record.amount;
        namesAndAmounts.push(obj);
      } else if (namesAndAmounts.find(n => n.name === record.categoryName)){
        let objIndex;
        objIndex = namesAndAmounts.findIndex((obj => obj.name == record.categoryName));
        namesAndAmounts[objIndex]['amount'] += record.amount;
      }
    });

    return namesAndAmounts;
  }

  getIncomeData(): void {
    const canvas = <HTMLCanvasElement> document.getElementById('incomePieChart');
    const names: string[] = this.getNamesAndAmounts(this.incomeRecords).map(na => na.name);
    const amounts: number[] = this.getNamesAndAmounts(this.incomeRecords).map(na => na.amount);
    const bgColors = this.incomeRecords.map(() => `#${this.colorRandomizer()}`);

    if (canvas && names && amounts && bgColors) {
      if (this.incomePieChart != null) {
        this.incomePieChart.destroy();
      }
      this.incomePieChart = new Chart(canvas, {
        type: 'pie',
        data: {
          labels: names,
          datasets: [{
            data: amounts,
            backgroundColor: bgColors,
            hoverBackgroundColor: bgColors,
          }]
        },
        options: {  
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
            },
          }
        }
      })
    }
  }

  getExpenseData(): void {
    const canvas = <HTMLCanvasElement> document.getElementById('expensePieChart');
    const names: string[] = this.getNamesAndAmounts(this.expenseRecords).map(na => na.name);
    const amounts: number[] = this.getNamesAndAmounts(this.expenseRecords).map(na => na.amount);
    const bgColors = this.expenseRecords.map(() => `#${this.colorRandomizer()}`);

    if (canvas && names && amounts && bgColors) {
      if (this.expensePieChart != null) {
        this.expensePieChart.destroy();
      }
      this.expensePieChart = new Chart(canvas, {
        type: 'pie',
        data: {
          labels: names,
          datasets: [{
            data: amounts,
            backgroundColor: bgColors,
            hoverBackgroundColor: bgColors,
            // radius: '70%'
          }]
        },
        options: {  
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
            },
          }
        }
      })
    }
  }

  onDateSelect(start: Date, end: Date): void {
    const dateStart = moment(start).format('L');
    const dateEnd = moment(end).format('L');
    let incomeList: Record[] = [];
    let expenseList: Record[] = [];

    this.records.forEach(record => {
      const recordDate = moment(record.createdOn).format('L');

      if(recordDate >= dateStart && recordDate <= dateEnd) {
        if (record.categoryType === 'Income') {
          incomeList.push(record);
        } else if (record.categoryType === 'Expense') {
          expenseList.push(record);
        }
      }
    })
    this.incomeRecords = incomeList;
    this.expenseRecords = expenseList;
  }

  colorRandomizer(): string {
    return Math.floor(Math.random()*16777215).toString(16);
  }

}

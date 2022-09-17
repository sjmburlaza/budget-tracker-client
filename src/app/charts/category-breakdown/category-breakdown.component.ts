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
    this.getDetails();
  }

  getDetails(): void {
    this.userService.getDetails().subscribe(data => {
      this.records = data.records;
    });
  }

  onSelect(): void {
    if (this.rangeDates[1] && this.incomeRecords && this.expenseRecords) {
      this.onDateSelect(this.rangeDates[0], this.rangeDates[1]);
      this.getIncomeData();
      this.getExpenseData();
    }
  }

  getIncomeData(): void {
    const canvas = <HTMLCanvasElement> document.getElementById('incomePieChart');
    const names = this.incomeRecords.map(record => record.name);
    const amounts = this.incomeRecords.map(record => record.amount);
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
            // radius: '70%'
          }]
        }
      })
    }
  }

  getExpenseData(): void {
    const canvas = <HTMLCanvasElement> document.getElementById('expensePieChart');
    const names = this.expenseRecords.map(record => record.name);
    const amounts = this.expenseRecords.map(record => record.amount);
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
        if (record.type === 'Income') {
          incomeList.push(record);
        } else if (record.type === 'Expense') {
          expenseList.push(record);
        }
      }
    })
    this.incomeRecords = incomeList;
    this.expenseRecords = expenseList;
  }

  colorRandomizer(): string {
    return Math.floor(Math.random()*16777215).toString(16)
  }

}

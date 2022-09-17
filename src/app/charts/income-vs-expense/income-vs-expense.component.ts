import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { Record, UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-income-vs-expense',
  templateUrl: './income-vs-expense.component.html',
  styleUrls: ['./income-vs-expense.component.css']
})
export class IncomeVsExpenseComponent implements OnInit, AfterContentInit {

  records: Record[] = [];
  incomeRecords: Record[] = [];
  expenseRecords: Record[] = [];
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  barChart: any;

  constructor(private userService: UserService) { 
    
  }

  ngOnInit(): void {
    this.getDetails();
  }

  ngAfterContentInit(): void {
    // console.log('records',this.records)
    // this.populateIncomeChart();
  }

  getDetails(): void {
    this.userService.getDetails().subscribe(data => {
      this.records = data.records;
    });
  }

  getInExData(): void {
    let income: Record[] = [];
    let expense: Record[] = [];

    this.records.forEach(record => {
      if  (record.type === 'Income') {
        income.push(record)
      } else if (record.type === 'Expense') {
        expense.push(record)
      }
    })

    this.incomeRecords = income;
    this.expenseRecords = expense;
  }

  getMonthlyIncome(): number[] {
    this.getInExData();

    return this.months.map(month => {
      let income = 0;
      this.incomeRecords.forEach(record => {
        const recordMon = moment(record.createdOn).format('MMMM');
        if (recordMon === month) {
          income += record.amount;
        }
      })
      return income;
    })
  }

  getMonthlyExpenses(): number[] {
    this.getInExData();

    return this.months.map(month => {
      let expenses = 0;
      console.log(this.expenseRecords)
      this.expenseRecords.forEach(record => {
        const recordMon = moment(record.createdOn).format('MMMM');
        if (recordMon === month) {
          expenses += record.amount
        }
      })
      return expenses;
    })
  }

  populateChart(): void {
    const monthlyIncome = this.getMonthlyIncome();
    const monthlyExpenses = this.getMonthlyExpenses();
    const canvas = <HTMLCanvasElement> document.getElementById('barChart');
    if (canvas) {
      this.barChart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: this.months,
          datasets: [
            {
              label: 'Monthly Income for the year 2022',
              backgroundColor: 'rgba(97, 171, 64, 0.2)',
              borderColor: 'rgba(97, 171, 64, 1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(97, 171, 64, 0.4)',
              hoverBorderColor: 'rgba(97, 171, 64, 1)',
              data: monthlyIncome,
              order: 1
            },
            {
              label: 'Monthly Income for the year 2022',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
              hoverBorderColor: 'rgba(255, 99, 132, 1)',
              data: monthlyExpenses,
              order: 2
            }
        ]
        },
        options: {  
          responsive: true,
          maintainAspectRatio: false
        }
      })
    }
  }

}

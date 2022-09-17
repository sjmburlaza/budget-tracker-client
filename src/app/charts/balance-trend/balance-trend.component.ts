import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import * as moment from 'moment';
import { Record, UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-balance-trend',
  templateUrl: './balance-trend.component.html',
  styleUrls: ['./balance-trend.component.css']
})
export class BalanceTrendComponent implements OnInit {

  records: Record[] = [];
  rangeDates: Date[] = [];
  trendDates: string[] = [];
  trendBalance: number[] = [];

  public chart: any;

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
    if (this.rangeDates[1]) {
      this.onDateSelect(this.rangeDates[0], this.rangeDates[1]);
      const canvas = <HTMLCanvasElement> document.getElementById('lineChart');

      if (canvas) {
        if (this.chart) {
          this.chart.destroy();
        }
        this.chart = new Chart(canvas, {
          type: 'line',
          data: {
            labels: this.trendDates,
            datasets: [
              {
                data: this.trendBalance,
                label: 'Series A',
                fill: true,
                tension: 0.5,
                borderColor: 'black',
                backgroundColor: 'rgba(255,0,0,0.3)'
              }
            ]
          },
          options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio: false
          }
        })
      }
    }
  }

  onDateSelect(start: Date, end: Date): void {
    const dateStart = moment(start).format('YYYY-MM-DD');
    const dateEnd = moment(end).format('YYYY-MM-DD');
    let dateList: any = [];
    let balanceList: number[] = [];
    let runningBalance = 0;

    this.records.forEach(record => {
      const recordDate = moment(record.createdOn).format('YYYY-MM-DD');
      if (!recordDate) {
        return;
      }
      if (recordDate >= dateStart && recordDate <= dateEnd) {
        if (!(dateList.includes(recordDate))) {
          if (record.type === 'Income') {
            runningBalance += +record.amount;
            balanceList.push(runningBalance);
          } else if (record.type === 'Expense') {
            runningBalance -= +record.amount;
            balanceList.push(runningBalance);
          }
          dateList.push(recordDate);

        } else {
          const lastBalance = balanceList[balanceList.length-1]
          if (record.type === 'Income') {
            runningBalance = +lastBalance + +record.amount;
            balanceList.pop();
            balanceList.push(runningBalance);
          } else if (record.type === 'Expense') {
            runningBalance = +lastBalance - +record.amount;
            balanceList.pop();
            balanceList.push(runningBalance);
          }
        }
      }
    })
    this.trendDates = dateList;
    this.trendBalance = balanceList;
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showBalanceTrend();
  }

  showBalanceTrend(): void {
    this.router.navigate(['balance-trend'], {relativeTo:this.route});
  }

  showCategoryBreakdown(): void {
    this.router.navigate(['category-breakdown'], {relativeTo:this.route});
  }

  showIncomeVsExpense(): void {
    this.router.navigate(['income-vs-expense'], {relativeTo:this.route});
  }

}

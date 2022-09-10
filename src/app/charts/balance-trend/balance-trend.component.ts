import { Component, OnInit } from '@angular/core';
import { Record, UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-balance-trend',
  templateUrl: './balance-trend.component.html',
  styleUrls: ['./balance-trend.component.css']
})
export class BalanceTrendComponent implements OnInit {

  records: Record[] = [];
  selectedDateStart: Date = new Date();
  selectedDateEnd: Date = new Date();
  trendDates: Date[] = [];

  data = {
    labels: this.trendDates
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails(): void {
    this.userService.getDetails().subscribe(data => {
      // this.categories = data.categories;
      this.records = data.records
    });
  }

}

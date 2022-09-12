import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails(): void {
    this.userService.getDetails().subscribe(data => {
      this.records = data.records;
    });
  }

}

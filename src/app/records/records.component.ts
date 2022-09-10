import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DialogService } from 'primeng/dynamicdialog';
import { Record, UserService } from '../_services/user.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
  providers: [DialogService]
})
export class RecordsComponent implements OnInit {

  records: Record[] = [];

  constructor(
    private userService: UserService,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords(): void {
    this.userService.getDetails().subscribe(data => {
      console.log(data)
      const records: Record[] = data.records;
      records.forEach(a => {
        return a.createdOn = moment(a.createdOn).format('ll')
      })
      this.records.push(...records);
    })
  }

}

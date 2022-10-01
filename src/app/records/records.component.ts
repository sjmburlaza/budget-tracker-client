import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DialogService } from 'primeng/dynamicdialog';
import { Record, UserService } from '../_services/user.service';
import { AddRecordComponent } from './add-record/add-record.component';

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

  show() {
    const ref = this.dialogService.open(AddRecordComponent, {
        width: this.getDialogWidth(),
        contentStyle: {"min-width": "300px"},
        baseZIndex: 10000,
        closable: false
    });
  }

  getDialogWidth(): string {
    if (window.innerWidth < 400) {
      return "90%"
    } else if (window.innerWidth > 400 && window.innerWidth < 700) {
      return "60%"
    }
    return "30%"
  }

  // delete(category: Category) {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete ' + category.name + '?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //         this.userService.updateCategory(category).subscribe(data => {
  //           console.log(data)
  //         })
  //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
  //     }
  // });
  // }

}

import { Component } from '@angular/core';
import { Record } from '../shared/models/record.model';

@Component({
  selector: 'bt-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent {
  recordList: Record[] = [];
  headerTitle = '';
  openModal = false;

  addNewRecord(): void {

  }

  closeModal(): void {

  }
}

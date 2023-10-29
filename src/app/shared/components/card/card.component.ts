import { Component, Input } from '@angular/core';
import { Category } from '../../models/category.model';
import { Record } from '../../models/record.model';

@Component({
  selector: 'bt-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() category: Category | undefined;
  @Input() record: Record | undefined;

  constructor() {}
}

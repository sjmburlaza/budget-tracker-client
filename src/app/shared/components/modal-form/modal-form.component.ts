import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
  selector: 'bt-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent {
  @Output() closeModal = new EventEmitter();
  category!: Partial<Category>;
  isCategory = true;

  submitForm(): void {
    
  }

  close(): void {
    this.closeModal.emit();
  }
}

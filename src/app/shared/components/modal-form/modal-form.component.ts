import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../models/category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'bt-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent {
  @Input() headerTitle = '';
  @Output() closeModal = new EventEmitter();
  categoryForm!: Partial<Category>;
  isCategory = true;
  recordForm!: FormGroup<any>;
  selectedCategories: Category[] = [];
  dateNow = new Date();

  constructor(
    private fb: FormBuilder,
  ) {}

  initRecordForm(): void {
    this.recordForm = this.fb.group({
      categoryType: ['', [Validators.required]],
      categoryName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      amount: [0, [Validators.required]],
      transactionDate: [new Date(), Validators.required],
    });
  }

  onCategoryTypeChange(): void {

  }

  submitForm(): void {
    
  }

  close(): void {
    this.closeModal.emit();
  }
}

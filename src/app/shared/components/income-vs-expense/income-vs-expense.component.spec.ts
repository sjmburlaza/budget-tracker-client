import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeVsExpenseComponent } from './income-vs-expense.component';

describe('IncomeVsExpenseComponent', () => {
  let component: IncomeVsExpenseComponent;
  let fixture: ComponentFixture<IncomeVsExpenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomeVsExpenseComponent]
    });
    fixture = TestBed.createComponent(IncomeVsExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

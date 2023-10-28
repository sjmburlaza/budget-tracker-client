import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBreakdownComponent } from './category-breakdown.component';

describe('CategoryBreakdownComponent', () => {
  let component: CategoryBreakdownComponent;
  let fixture: ComponentFixture<CategoryBreakdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryBreakdownComponent]
    });
    fixture = TestBed.createComponent(CategoryBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

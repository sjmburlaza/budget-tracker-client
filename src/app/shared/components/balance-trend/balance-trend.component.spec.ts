import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceTrendComponent } from './balance-trend.component';

describe('BalanceTrendComponent', () => {
  let component: BalanceTrendComponent;
  let fixture: ComponentFixture<BalanceTrendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalanceTrendComponent]
    });
    fixture = TestBed.createComponent(BalanceTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

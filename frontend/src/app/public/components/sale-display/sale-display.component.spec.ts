import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleDisplayComponent } from './sale-display.component';

describe('SaleDisplayComponent', () => {
  let component: SaleDisplayComponent;
  let fixture: ComponentFixture<SaleDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaleDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SaleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleListPanelComponent } from './sale-list-panel.component';

describe('SaleListComponent', () => {
  let component: SaleListPanelComponent;
  let fixture: ComponentFixture<SaleListPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaleListPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SaleListPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

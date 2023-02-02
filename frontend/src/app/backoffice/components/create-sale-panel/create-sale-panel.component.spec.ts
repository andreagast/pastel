import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSalePanelComponent } from './create-sale-panel.component';

describe('CreateSalePanelComponent', () => {
  let component: CreateSalePanelComponent;
  let fixture: ComponentFixture<CreateSalePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSalePanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSalePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

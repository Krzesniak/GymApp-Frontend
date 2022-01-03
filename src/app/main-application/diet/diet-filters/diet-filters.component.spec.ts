import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietFiltersComponent } from './diet-filters.component';

describe('DietFiltersComponent', () => {
  let component: DietFiltersComponent;
  let fixture: ComponentFixture<DietFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

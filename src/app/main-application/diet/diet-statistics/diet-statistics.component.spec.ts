import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietStatisticsComponent } from './diet-statistics.component';

describe('DietStatisticsComponent', () => {
  let component: DietStatisticsComponent;
  let fixture: ComponentFixture<DietStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingEditFormComponent } from './training-edit-form.component';

describe('TrainingEditFormComponent', () => {
  let component: TrainingEditFormComponent;
  let fixture: ComponentFixture<TrainingEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

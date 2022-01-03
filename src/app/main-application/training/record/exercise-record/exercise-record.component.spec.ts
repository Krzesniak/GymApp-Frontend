import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseRecordComponent } from './exercise-record.component';

describe('ExerciseRecordComponent', () => {
  let component: ExerciseRecordComponent;
  let fixture: ComponentFixture<ExerciseRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

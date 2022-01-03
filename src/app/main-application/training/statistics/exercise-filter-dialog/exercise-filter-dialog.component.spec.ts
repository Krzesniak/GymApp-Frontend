import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseFilterDialogComponent } from './exercise-filter-dialog.component';

describe('ExerciseFilterDialogComponent', () => {
  let component: ExerciseFilterDialogComponent;
  let fixture: ComponentFixture<ExerciseFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseFilterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

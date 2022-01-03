import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingAddFormComponent } from './training-add-form.component';

describe('TrainingAddFormComponent', () => {
  let component: TrainingAddFormComponent;
  let fixture: ComponentFixture<TrainingAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

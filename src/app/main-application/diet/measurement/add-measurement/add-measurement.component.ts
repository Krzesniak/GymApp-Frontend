import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {InteractionService} from "../../../../services/interaction.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddMeasurementComponent implements OnInit, OnDestroy {
  measurementForm: FormGroup;

  constructor(private fb: FormBuilder, private interactionService: InteractionService,
              private location: Location) {
    this.measurementForm = this.fb.group({
      height: [''],
      weight: [''],
      arm: [''],
      forehand: [''],
      neck: [''],
      wrist: [''],
      chest: [''],
      waist: [''],
      calf: [''],
      thigh: ['']
    })
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.interactionService.sendMessage('true');
  }

  goBack() {
    this.location.back();
  }
}

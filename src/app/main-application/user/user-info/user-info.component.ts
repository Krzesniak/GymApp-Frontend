import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserInfoComponent implements OnInit {
  url: any;
  personalInfo: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.personalInfo = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthday: ['', Validators.required],
      country: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(data => {
      this.personalInfo.patchValue({
        name: data.name,
        surname: data.surname,
        birthday: data.dateBirth,
        country: data.country,
        street: data.street,
        city: data.city
      })
      this.url = data.urlImage;
    })

  }

}

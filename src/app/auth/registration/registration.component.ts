import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {MeasurementProgress} from "../../main-application/diet/diet-statistics/diet-statistics.component";
import {Router} from "@angular/router";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {

  @ViewChild('selectedFile') file: ElementRef<HTMLElement> | undefined;
  fileRef!: File;
  generalInfoForm: FormGroup;
  measurementForm: FormGroup;
  personalInfo: FormGroup;
  agreementForm: FormGroup;
  url: String = '../../../assets/img/bench_press.jpg';
  agreementFormInvalid: boolean = false;

  constructor(private fb: FormBuilder, private location: Location, private authService: AuthService,
              private router: Router) {
    this.generalInfoForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordSecondTime: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    }, {validators: passwordValidation});
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
    this.personalInfo = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthday: ['', Validators.required],
      country: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
    })
    this.agreementForm = this.fb.group({
      agree1: [false, Validators.requiredTrue],
      agree2: [false, Validators.requiredTrue]
    })
  }

  ngOnInit(): void {
  }

  exit() {
    this.location.back();
  }

  getInput() {
    this.file?.nativeElement.click();
  }


  changeAvatar(event: Event) {

    // @ts-ignore
    this.fileRef = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.fileRef);
    reader.onload = (anotherEvent: any) => {
      this.url = anotherEvent.target.result;
    }

  }

  sendForm() {
    if (this.agreementForm.invalid) {
      this.agreementFormInvalid = true;
      return;
    }
    const formData = new FormData();
    formData.append("file", this.fileRef);
    this.authService.registerAvatar(formData).subscribe((imageURL : any) => {
      let loginCredentialsForm: LoginCredentials = {
        email : this.generalInfoForm.get('email')?.value,
        password : this.generalInfoForm.get('password')?.value,
        username : this.generalInfoForm.get('username')?.value
      }
      let privateInformation: PrivateInformation = {
        name : this.personalInfo.get('name')?.value,
        surname : this.personalInfo.get('surname')?.value,
        country : this.personalInfo.get('country')?.value,
        city : this.personalInfo.get('city')?.value,
        dateBirth: this.personalInfo.get('birthday')?.value,
        street: this.personalInfo.get('street')?.value,
        urlImage: <string> imageURL.imageURL
      }
      let measurement: Measurement = {
        arm : this.measurementForm.get('arm')?.value,
        forehand : this.measurementForm.get('forehand')?.value,
        calf : this.measurementForm.get('calf')?.value,
        neck : this.measurementForm.get('neck')?.value,
        height : this.measurementForm.get('height')?.value,
        weight : this.measurementForm.get('weight')?.value,
        chest : this.measurementForm.get('chest')?.value,
        thigh : this.measurementForm.get('thigh')?.value,
        waist : this.measurementForm.get('waist')?.value,
        wrist: this.measurementForm.get('wrist')?.value,
        date: new Date()
      }
      let register: Registration = {
        loginCredentials : loginCredentialsForm,
        privateInformation: privateInformation,
        measurement: measurement
      }
      this.authService.registerUser(register).subscribe(data => {
        this.router.navigate(['/home'], {queryParams: { registered: 'true' } });
      });
    });

  }
}

export function passwordValidation(c: AbstractControl) {
  if (c.get('password')?.value === c.get('passwordSecondTime')?.value) {
    return null;
  }
  c.get('passwordSecondTime')?.setErrors({invalidPassword: true});
  return {'nomatch': true};

}

export interface Registration {
  loginCredentials: LoginCredentials,
  privateInformation: PrivateInformation,
  measurement: Measurement
}
export interface LoginCredentials{
  username: string,
  password: string,
  email: string
}
export interface PrivateInformation{
  name: string,
  surname: string,
  dateBirth: Date,
  country: string,
  city: string,
  street: string
  urlImage: string
}
export interface Measurement{
  height: number,
  weight: number,
  neck: number,
  chest: number,
  arm: number,
  forehand: number,
  waist: number,
  thigh: number,
  calf: number,
  wrist: number,
  date: Date
}




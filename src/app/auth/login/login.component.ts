import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequest} from "./login-request";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  isError: boolean = false;
  loginForm: FormGroup;
  loginRequestPayload: LoginRequest = {password: "", username: ""};

  constructor(private authService: AuthService, private router: Router,
              private location: Location,) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {

  }

  login() {
    // @ts-ignore
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    // @ts-ignore
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      this.isError = false;
      this.router.navigate(['/app']);
    },
      error => {
        this.isError = true;
      });
  }

  exit() {
    this.router.navigate(['/home']);
  }

  register() {
    this.router.navigate(['/home/registration']);
  }
}

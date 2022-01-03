import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-starting-page',
  templateUrl: './starting-page.component.html',
  styleUrls: ['./starting-page.component.css']
})
export class StartingPageComponent implements OnInit {
   infoMessage: string = '';
   isSuccessfullyVerified: boolean = false;
   registrationMessage = '';

  constructor(private router: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.router.queryParams
      .subscribe(params => {
        if(params.registered !== undefined && params.registered === 'true') {
          this.infoMessage = 'Rejestracja zakończona pomyślnie! Odwiedź skrzynkę pocztową w celu weryfikacji konta!';
          setTimeout(() => {
            this.infoMessage = '';
          }, 5000);
        }
        if(params.verify !== undefined){
          let token = params.verify;
          this.authService.verifyUser(token).subscribe(data => {
            this.isSuccessfullyVerified = true;
            console.log(this.isSuccessfullyVerified)
            this.registrationMessage = "Konto zostało pomyślnie aktywowane!"
            setTimeout(() => {
              this.registrationMessage = '';
              this.isSuccessfullyVerified = false;
            }, 5000);
          }, error => {
            console.log(error)
            this.isSuccessfullyVerified = false;
            this.registrationMessage = "Błąd przy aktywacji konta!"
            setTimeout(() => {
              this.registrationMessage = '';
              this.isSuccessfullyVerified = false;
            }, 5000);
          });
        }
      });
  }

}

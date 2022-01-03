import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  avatarURL : String = "";
  role: string;
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private authService: AuthService, private router: Router) {
    this.role = authService.getRole();
    authService.getImage().subscribe(data =>{
      this.avatarURL = data.imageURL;
    });
  }

  ngOnInit(): void {
  }
  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }

  logout() {
    this.authService.logoout();
  }
}

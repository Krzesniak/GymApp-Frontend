import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {InteractionService} from "../../services/interaction.service";

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {

  constructor(private router: Router,
              private interactionService: InteractionService) { }

  ngOnInit(): void {
  }

  login() {
      this.interactionService.sendMessage("false");
      this.router.navigate(['home/login']);
  }
}

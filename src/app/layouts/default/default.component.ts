import { Component, OnInit } from '@angular/core';
import {InteractionService} from "../../services/interaction.service";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;
  headerOpen: boolean = true;

  constructor(private interactionService:InteractionService ) { }

  ngOnInit(): void {
    this.interactionService.teacherMessages$.subscribe(message => {
     if(message === "false"){
       this.sideBarOpen = false;
       this.headerOpen = false;
     }
     if(message === "true"){
       this.sideBarOpen = true;
       this.headerOpen = true;
     }
    })
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  closeSideBar() {
    this.sideBarOpen = false;
  }

}

import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CalendarOptions, FullCalendarComponent} from "@fullcalendar/angular";
import {Router} from "@angular/router";
import {InteractionService} from "../../../services/interaction.service";
import {TrainingService} from "../../../services/training.service";

@Component({
  selector: 'app-training-overview',
  templateUrl: './training-overview.component.html',
  styleUrls: ['./training-overview.component.css'],
  encapsulation: ViewEncapsulation.None

})

export class TrainingOverviewComponent implements OnInit,  AfterViewInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  trainings: any[] = [{ title: '', date: new Date(), id: ''}];
  events: any = [
    { title: 'Trening silowy prostadple nogi ulo', date: '2021-10-09 16:30', id: '612e8ca0-b460-496f-907b-cc2abe997445' },
    { title: 'event 2', date: '2021-10-12', id: '612e8ca0-b460-496f-907b-ac2abe997445'  }
  ]
  constructor( private router: Router, private interactionService: InteractionService,
               private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingService.getAllTrainings().subscribe(trainings => {
      this.trainings = trainings;
      this.calendarOptions.events = this.trainings;

    })
    setTimeout(() => {
      this.calendarComponent.getApi().updateSize();
    }, 300);
    this.interactionService.teacherMessages$.subscribe(data =>{
      setTimeout(() => {
        this.calendarComponent.getApi().updateSize();
      }, 300)
    })
  }
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: "pl",
    firstDay: 1,
    fixedWeekCount: false,
    events: this.events,
    eventClick: this.onClick.bind(this)
  };
  onClick(arg: any){
    this.interactionService.sendMessage('false');
   let change =  this.router.navigate(['app/trainings', arg.event.id]);
   change.finally(() => {
     this.calendarComponent.getApi().updateSize();

   })
   // this.dialog.open(TrainingDetailsComponent, {data: {id: arg.event.id}});
    console.log(arg.event.id)
  }

  addTraining() {
    this.router.navigate(['app/trainings/create']);
    this.interactionService.sendMessage('false');
    this.calendarComponent.getApi().updateSize();

  }


  ngAfterViewInit(): void {
    this.calendarComponent.getApi().updateSize();

  }


}
export interface Training{
  title: String,
  id: String,
  date: Date
}

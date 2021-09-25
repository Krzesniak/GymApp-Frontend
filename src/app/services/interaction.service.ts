import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private _teacherManagerSource = new Subject<String>();
  teacherMessages$ = this._teacherManagerSource.asObservable();
  constructor() { }

  sendMessage(message: string){
    this._teacherManagerSource.next(message);
  }
}

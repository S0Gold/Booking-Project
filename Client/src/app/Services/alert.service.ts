import { Injectable } from '@angular/core';
import * as alertifyjs from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

constructor() { }

success(message : string){
  alertifyjs.set('notifier','position','top-right');
  alertifyjs.success(message,'top-right');
}

error(message : string){
  alertifyjs.set('notifier','position','top-right');
  alertifyjs.error(message);

}

warning(message : string){
  alertifyjs.set('notifier','position','top-right');
  alertifyjs.warning(message,'top-right');
}
}

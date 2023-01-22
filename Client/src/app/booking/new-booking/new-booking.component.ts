import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from 'src/app/Models/Booking';
import { BookingDto } from 'src/app/Models/BookingDto';
import { AlertService } from 'src/app/Services/alert.service';
import { BookingServiceService } from 'src/app/Services/booking-service.service';


@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent implements OnInit {
  booking: Booking = {
    id: 0,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    cnp: '',
    roomNumber: 0,
    startDate: new Date(),
    stopDate: new Date()
  };

  constructor(
    private service: BookingServiceService,
    private router : Router,
    private alter: AlertService) { 

  }

  ngOnInit() {
  }

  processEvent(response : BookingDto){
    if(response.StopDate != undefined)
    {
      this.service.AddNewBooking(response).subscribe(
        response => {
          console.log(response);
          setTimeout(() => {
            this.alter.success("Rezervare inregistrata cu succes!")
            this.router.navigate(['/']);
        }, 2000); 
        }, error =>{
          this.alter.error(error.error)
          console.log(error);
        }
      );
      
    }
  }



}
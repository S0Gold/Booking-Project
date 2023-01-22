import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/Models/Booking';
import { BookingDto } from 'src/app/Models/BookingDto';
import { AlertService } from 'src/app/Services/alert.service';
import { BookingServiceService } from 'src/app/Services/booking-service.service';


@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {

  bookingId! : number;
 
  booking : Booking = {
    id: 0,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    cnp: '',
    roomNumber: 0,
    startDate: new Date(),
    stopDate: new Date()
  }
  constructor(
    private route : ActivatedRoute,
    private service: BookingServiceService,
    private router : Router,
    private alter: AlertService) { 

  }

  ngOnInit() {
    (async () => {
      this.bookingId = Number(this.route.snapshot.params['id']);
      console.log(this.bookingId);
      await this.service.GetBookingById(this.bookingId).subscribe(
       response =>{
        this.booking = response;
        console.log(this.booking.startDate)
       }, error =>{
        this.router.navigate(['/']);
      }
       
      )
    })();
    

  }

  processEvent(response : BookingDto){
    if(response.StopDate != undefined)
    {
      this.service.ModifyBooking(this.bookingId, response).subscribe(
        response => {
          console.log(response);
          this.alter.success("Rezervare modificata cu succes!")
          setTimeout(() => {
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from 'src/app/Models/Booking';
import { BookingServiceService } from 'src/app/Services/booking-service.service';
import { TableModule } from 'primeng/table';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['./list-booking.component.css']
})
export class ListBookingComponent implements OnInit {

  bookings! : Array<Booking>
  
  constructor(
    private service: BookingServiceService,
    private alter: AlertService
  ) { }

  ngOnInit() {
    this.service.GetAllBookings()
      .subscribe((response) => {
        this.bookings = response;
    });
  }


  getFormatDate(date : Date){
    let format = new Date(date);
    return format.toLocaleDateString("ro-RO") + " " + format.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hourCycle: 'h23'})
  }

  removeBooking(id :number){
    this.service.RemoveBooking(id).subscribe(
      response => {
        console.log(response);
        this.alter.success("Rezervarea a fost eliminata!")
        setTimeout(() => {
            window.location.reload();;
      }, 2000);  
      }, error =>{
        this.alter.error("Rezervare inregistrata cu succes!")
        console.log(error);
      }
    );
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BookingDto } from '../Models/BookingDto';
import { Observable } from 'rxjs';
import { Booking } from '../Models/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

baseUrl = 'https://localhost:7166/api/bookings/';

constructor(private http : HttpClient) { }

GetAllBookings( ) : Observable<Array<Booking>> {
  return this.http.get<Array<Booking>>(this.baseUrl+"GetAllBookings");
}

AddNewBooking(booking : BookingDto) {
    return this.http.post(this.baseUrl, booking);
}

GetBookingById(id : number) {
  return this.http.get<Booking>(this.baseUrl + "GetBookingById/"+ id);
}

ModifyBooking(id : number, booking : BookingDto) {
  return this.http.put(this.baseUrl + "ModifyBooking/"+ id, booking);
}

RemoveBooking(id : number) {
  return this.http.delete(this.baseUrl + "RemoveBooking/"+ id);
}

}

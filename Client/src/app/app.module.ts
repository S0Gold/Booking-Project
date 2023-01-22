import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NewBookingComponent } from './booking/new-booking/new-booking.component';
import { BookingFormComponent } from './booking/booking-form/booking-form.component';
import { EditBookingComponent } from './booking/edit-booking/edit-booking.component';
import { ListBookingComponent } from './booking/list-booking/list-booking.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TableModule } from 'primeng/table';
import { ButtonModule} from 'primeng/button';
import { CalendarModule} from 'primeng/calendar';
import * as alertifyjs from 'alertifyjs';

@NgModule({
  declarations: [			
    AppComponent,
    NewBookingComponent,
    EditBookingComponent,
    BookingFormComponent,
    ListBookingComponent 
   ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    CalendarModule
  ],
  providers: [FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

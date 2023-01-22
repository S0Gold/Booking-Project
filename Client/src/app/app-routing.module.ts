import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditBookingComponent } from './booking/edit-booking/edit-booking.component';
import { ListBookingComponent } from './booking/list-booking/list-booking.component';
import { NewBookingComponent } from './booking/new-booking/new-booking.component';

const routes : Routes = [
  {path : '', component : ListBookingComponent},
  {path : 'add', component : NewBookingComponent},
  {path : 'edit/:id', component : EditBookingComponent},
  {path : '**', component : ListBookingComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

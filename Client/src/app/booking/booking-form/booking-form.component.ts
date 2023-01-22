import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from 'src/app/Models/Booking';
import { BookingDto } from 'src/app/Models/BookingDto';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})

export class BookingFormComponent implements OnInit {

  @Input() booking!: Booking;
  @Output() change : EventEmitter<BookingDto> = new EventEmitter<BookingDto>();

  bookingForm!: FormGroup;
  submited! : boolean;

  startDate! : Date;
  stopDate! : Date;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    console.log(this.booking.startDate);
    this.createRegistraisonForm();
  }

  ngOnChanges(){
    this.startDate = new Date(this.booking.startDate);
    this.stopDate = new Date(this.booking.stopDate);
  }
  onSubmit(){

    this.submited = true;

    if(this.bookingForm.valid && this.startDate != undefined && this.stopDate != undefined){
      let formValue : BookingDto ={
        FirstName: this.firstName.value,
        LastName: this.lastName.value,
        PhoneNumber: this.phoneNumber.value,
        Cnp: this.cnp.value,
        RoomNumber: this.roomNumber.value,
        StartDate: this.startDate,
        StopDate: this.stopDate
      }
      console.log("Ok") 
      this.change.emit(formValue);  
    }
    else{
      console.log('Kindly, provide the requierd fields');
    }

  }
  ceva(){
  }

  createRegistraisonForm(){
    this.bookingForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber:[null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^-?(0|[0-9]\d*)?$/)]],
      cnp:[null, [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^-?(0|[0-9]\d*)?$/)]],
      roomNumber: [null, Validators.required],
      startDate: [null],
      stopDate: [null]
    });
  }
  get firstName(){
    return this.bookingForm.get('firstName') as FormControl;
  }
  get lastName(){
    return this.bookingForm.get('lastName') as FormControl;
  }
  get cnp(){
    return this.bookingForm.get('cnp') as FormControl;
  }
  get phoneNumber(){
    return this.bookingForm.get('phoneNumber') as FormControl;
  }
  get roomNumber(){
    return this.bookingForm.get('roomNumber') as FormControl;
  }
}

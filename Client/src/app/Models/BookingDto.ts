import * as internal from "stream";

export interface BookingDto {
    FirstName: string;
    LastName: string;
    Cnp: string;
    PhoneNumber: string;
    RoomNumber: number;
    StartDate: Date;
    StopDate: Date; 
}

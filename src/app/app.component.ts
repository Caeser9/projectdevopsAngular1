import { Component, OnInit } from '@angular/core';
import { Reservation } from './models/reservation';
import { ReservationService } from './services/reservation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  reservations: Reservation[] = [];
  newReservation: Reservation = { idReservation: '', anneeUniversitaire: new Date(), estValide: true }; // Default values


  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getAllReservations().subscribe(data => {
      this.reservations = data;
    });
  }
  addReservation(): void {
    this.reservationService.addReservation(this.newReservation).subscribe(reservation => {
      this.reservations.push(reservation); // Update the list after adding
      // Reset the form
      this.newReservation = { idReservation: '', anneeUniversitaire: new Date(), estValide: true };
    }, error => {
      console.error('Error adding reservation:', error);
    });
  }
  deleteReservation(id: string): void {
    this.reservationService.deleteReservation(id).subscribe(() => {
      this.reservations = this.reservations.filter(reservation => reservation.idReservation !== id);
      console.log(`Reservation with ID ${id} deleted successfully.`);
    }, error => {
      console.error('Error deleting reservation:', error);
    });
  }

}

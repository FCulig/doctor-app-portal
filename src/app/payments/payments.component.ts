import { Component, OnInit } from '@angular/core';
import { Appointment } from '../core/models/appointment';
import { Payment } from '../core/models/payment';
import { User } from '../core/models/user';
import { AppointmentService } from '../core/services/appointment.service';
import { PaymentsService } from '../core/services/payments.service';
import { StatsService } from '../core/services/stats.service';
import { UserService } from '../core/services/user.service';

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

    private users: User[];
    private payments: Payment[];

    public appointments: Appointment[];
    public nbrPaid = 0;
    public nbrPendingPayment = 0;

    constructor(
        private paymentsService: PaymentsService,
        private appointmentService: AppointmentService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.getAppointments();
    }

    private getAppointments(): void {
        this.appointmentService.getAllAppointments().subscribe(appointments => {
            this.appointments = appointments;
            this.getUsers();
            this.getPayments();
        });
    }

    private getPayments(): void {
        this.paymentsService.getPayments().subscribe(payments => {
            this.payments = payments;
            this.payments.forEach(payment => {
                this.appointments.forEach(appointment => {
                    if (payment.appointmentId === appointment.id) {
                        appointment.payment = payment;
                    }
                });
            });
            this.appointments.forEach(appointment => {
                if (appointment.paidInAdvance || appointment.payment.isPaid) {
                    this.nbrPaid++;
                } else {
                    this.nbrPendingPayment++;
                }
            });
        });
    }

    private getUsers(): void {
        this.userService.findUsers({ isVerified: true, isRegistrationComplete: true }).subscribe(users => {
            this.users = users;
            this.users.forEach(user => {
                this.appointments.forEach(appointment => {
                    if (appointment.doctorId === user.id) {
                        appointment.doctor = user;
                    } else if (appointment.patientId === user.id) {
                        appointment.patient = user;
                    }
                });
            });
        })
    }

}

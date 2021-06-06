import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../core/models/user';
import { AttachmentService } from '../core/services/attachment.service';
import { StatsService } from '../core/services/stats.service';
import { UserService } from '../core/services/user.service';

@Component({
    selector: 'app-doctor-verification',
    templateUrl: './doctor-verification.component.html',
    styleUrls: ['./doctor-verification.component.css']
})
export class DoctorVerificationComponent implements OnInit {

    public pendingVerification: User[];
    public totalDoctors: number;

    constructor(
        private userService: UserService,
        private statisticsService: StatsService,
        private attachmentService: AttachmentService
    ) { }

    ngOnInit(): void {
        this.getDoctorsPendingVerification();
        this.getStatistics();
    }

    public verifyDoctor(doctorId: string): void {
        this.userService.verifyDoctor(doctorId).subscribe(val => {
            this.removeDoctorFromPendingList(doctorId);
        });
    }

    public deleteDoctor(doctorId: string): void {
        this.userService.deleteUser(doctorId).subscribe(val => {
            this.removeDoctorFromPendingList(doctorId);
        });;
    }

    public getProfileImageLink(userId: string): string {
        return this.userService.getProfileImageLink(userId);
    }

    public downloadFile(doctorId, attachmentId): void {
        this.attachmentService.getAttachment(doctorId, attachmentId).subscribe(blob => {
            blob = new Blob([blob]);
            const a: any = document.createElement('a');
            a.style = 'display: none';
            document.body.appendChild(a);
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = attachmentId + ".pdf";
            a.click();
            window.URL.revokeObjectURL(url);
        });
    }

    private removeDoctorFromPendingList(doctorId): void {
        const indexToBeDeleted = this.pendingVerification.findIndex(doctor => doctor.id === doctorId);
        delete this.pendingVerification[indexToBeDeleted];
        this.getDoctorsPendingVerification();
        this.getStatistics();
    }

    private getDoctorsPendingVerification(): void {
        this.userService.findUsers({ role: 'doctor', isRegistrationComplete: true, isVerified: false }).subscribe(doctors => {
            this.pendingVerification = doctors;
        })
    }

    private getStatistics(): void {
        this.statisticsService.getStats().subscribe(val => {
            this.totalDoctors = val.registeredDoctors.total;
        })
    }
}

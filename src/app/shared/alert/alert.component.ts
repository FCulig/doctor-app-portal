import { Component, Input, OnInit } from '@angular/core';
import { Alert } from 'src/app/core/models/alert';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
    alert: Alert;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subsribeAlertChanges();
    }

    close() {
        this.alert = null;
    }

    private subsribeAlertChanges() {
        this.alertService.alert.subscribe(alert => {
            this.alert = alert;
        })
    }
}

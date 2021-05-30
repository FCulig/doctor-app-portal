import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { BehaviorSubject } from 'rxjs';
import { Alert } from '../models/alert';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    private alertSubject = new BehaviorSubject<Alert>(new Alert("", ""));
    alert = this.alertSubject.asObservable();

    constructor() { }

    public showAlert(alert: Alert) {
        this.alertSubject.next(alert);
    }
}

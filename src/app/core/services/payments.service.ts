import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../config/apiPath';
import { PaymentMapper } from '../mappers/payment.mapper';

@Injectable({
    providedIn: 'root'
})
export class PaymentsService {

    private baseUrl = environment.basePath;
    private paymentMapper = new PaymentMapper();

    constructor(private http: HttpClient) { }

    public getPayments(): Observable<any> {
        return this.http.get(this.baseUrl + ApiPaths.payments)
            .pipe(map(this.paymentMapper.mapArrayResponse));
    }

}

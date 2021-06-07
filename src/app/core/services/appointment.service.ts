import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../config/apiPath';
import { AppointmentMapper } from '../mappers/appointment.mapper';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = environment.basePath;
  private appointmentMapper = new AppointmentMapper();

  constructor(private http: HttpClient) { }

  public getAllAppointments(): Observable<any> {
    return this.http.get(this.baseUrl + ApiPaths.appointment)
      .pipe(map(this.appointmentMapper.mapArrayResponse));
  }
}

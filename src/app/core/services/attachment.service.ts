import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../config/apiPath';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  private baseUrl = environment.basePath;

  constructor(private http: HttpClient) { }

  public getAttachment(doctorId, attachmentId): Observable<any> {
    return this.http.get(this.baseUrl + ApiPaths.userDoctor + '/' + doctorId + ApiPaths.attachment + '/' + attachmentId
      , { observe: 'response', responseType: 'arraybuffer' });
  }
}

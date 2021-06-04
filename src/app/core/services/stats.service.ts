import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../config/apiPath';

@Injectable({
    providedIn: 'root'
})
export class StatsService {

    private baseUrl = environment.basePath;

    constructor(private http: HttpClient) { }

    public getStats(): Observable<any> {
        return this.http.get<any>(this.baseUrl + ApiPaths.stats);
    }
}

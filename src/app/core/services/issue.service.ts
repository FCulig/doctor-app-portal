import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../config/apiPath';
import { IssueMapper } from '../mappers/issue.mapper';
import { Issue } from '../models/issue';

@Injectable({
    providedIn: 'root'
})
export class IssueService {

    private baseUrl = environment.basePath;
    private issueMapper = new IssueMapper();

    constructor(private http: HttpClient) { }

    public getAllIssues(): Observable<any> {
        return this.http.get<Issue[]>(this.baseUrl + ApiPaths.issue)
            .pipe(map(this.issueMapper.mapArrayResponseToIssueArray));
    }
}

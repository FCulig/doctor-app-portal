import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../config/apiPath';
import { UserMapper } from '../mappers/user.mapper';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private baseUrl = environment.basePath;
    private userMapper = new UserMapper();

    constructor(private http: HttpClient) { }

    public findUsers(findUsersQuery): Observable<any> {
        return this.http.post<User[]>(this.baseUrl + ApiPaths.findUsers, findUsersQuery)
            .pipe(map(this.userMapper.mapArrayResponse));
    }

    public verifyDoctor(userId): Observable<any> {
        return this.http.put<null>(this.baseUrl + ApiPaths.userDoctor + '/' + userId + '/confirm', null)
            .pipe(map(this.userMapper.mapUserResponseToUser));
    }

    public deleteUser(userId): Observable<any> {
        return this.http.delete(this.baseUrl + ApiPaths.users + '/' + userId);
    }

    public getProfileImageLink(userId: string): string {
        return environment.basePath + '/user/' + userId + '/profile-image';
    }
}

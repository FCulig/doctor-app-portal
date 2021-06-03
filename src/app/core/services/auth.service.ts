import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ApiPaths } from '../config/apiPath';
import { UserMapper } from '../mappers/user.mapper';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseUrl = environment.basePath;
    private userMapper = new UserMapper();
    private currentUserSubject: BehaviorSubject<User>;

    public currentUser: Observable<User>;

    constructor(
        private jwtHelper: JwtHelperService,
        private http: HttpClient,
        private router: Router
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public isAuthenticated(): boolean {
        const token = this.currentUserValue?.token;
        return !this.jwtHelper.isTokenExpired(token);
    }

    //.pipe(map(this.userMapper.mapToUser)).pipe(map(this.userMapper.mapToUser))
    public login(loginBody): Observable<any> {
        return this.http.post<User>(this.baseUrl + ApiPaths.login, loginBody).pipe(map(user => {
            user = this.userMapper.mapLoginResponseToUser(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
    }

    public logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['login']);
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

}

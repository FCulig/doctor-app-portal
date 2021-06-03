import { Component, OnInit } from '@angular/core';
import { User } from '../core/models/user';
import { AuthService } from '../core/services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    model = {
        left: true,
        middle: false,
        right: false
    };

    focus;
    focus1;

    public currentUser: User;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.currentUser = this.authService.currentUserValue;
    }

    public logout() {
        this.authService.logout();
    }
}

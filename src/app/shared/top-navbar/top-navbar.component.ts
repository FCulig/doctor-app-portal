import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-top-navbar',
    templateUrl: './top-navbar.component.html',
    styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

    public currentUser;

    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.currentUser = this.authService.currentUserValue;
    }

    public getProfileImageLink(userId: string): string {
        return this.userService.getProfileImageLink(userId);
    }
}

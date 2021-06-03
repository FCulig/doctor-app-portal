import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../core/config/apiPath';
import { Issue } from '../core/models/issue';
import { User } from '../core/models/user';
import { AuthService } from '../core/services/auth.service';
import { IssueService } from '../core/services/issue.service';
import { UserService } from '../core/services/user.service';

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
    public admins: User[];
    public issues: Issue[];

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private issueService: IssueService
    ) { }

    ngOnInit() {
        this.currentUser = this.authService.currentUserValue;
        this.getAdmins();
        this.getIssues();
    }

    public getProfileImageLink(userId: string): string {
        return environment.basePath + '/user/' + userId + '/profile-image';
    }

    public logout(): void {
        this.authService.logout();
    }

    private getAdmins(): void {
        this.userService.findUsers({ role: 'admin' }).subscribe(admins => {
            this.admins = admins;
        });
    }

    private getIssues(): void {
        this.issueService.getAllIssues().subscribe(issues => {
            this.issues = issues;
        });
    }
}

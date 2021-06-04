import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../core/config/apiPath';
import { Issue } from '../core/models/issue';
import { User } from '../core/models/user';
import { AuthService } from '../core/services/auth.service';
import { IssueService } from '../core/services/issue.service';
import { UserService } from '../core/services/user.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { StatsService } from '../core/services/stats.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    // chart config
    public lineChartData: ChartDataSets[] = [];
    public lineChartLabels: Label[] = [];
    public lineChartOptions: (ChartOptions & { annotation: any }) = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            // We use this empty structure as a placeholder for dynamic theming.
            xAxes: [{}],
            yAxes: [
                {
                    id: 'y-axis-0',
                    position: 'left',
                }
            ],
        },
        annotation: {
            annotations: [
                {
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x-axis-0',
                    value: 'March',
                    borderColor: 'orange',
                    borderWidth: 2,
                    label: {
                        enabled: true,
                        fontColor: 'orange',
                        content: 'LineAnno'
                    }
                },
            ],
        },
    };
    public lineChartColors: Color[] = [
        { // lavander color
            backgroundColor: 'rgba(94,114,228,0.2)',
            borderColor: 'rgba(94,114,228,1)',
            pointBackgroundColor: 'rgba(94,114,2287,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(94,114,228,0.8)'
        }
    ];
    public lineChartType: ChartType = 'line';
    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void { }
    @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

    public barChartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        // We use these empty structures as placeholders for dynamic theming.
        scales: { xAxes: [{}], yAxes: [{}] },
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
            }
        }
    };
    public barChartLabels: Label[] = [];
    public barChartType: ChartType = 'bar';
    public barChartPlugins = [pluginDataLabels];
    public barChartColors: Color[] = [
        { // Orange color
            backgroundColor: 'rgba(251,99,64,1',
            borderColor: 'rgba(251,99,64,1)',
            pointBackgroundColor: 'rgba(251,99,64,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: 'rgba(251,99,64,0.2)',
            pointHoverBorderColor: 'rgba(251,99,64,0.8)'
        }
    ];

    public barChartData: ChartDataSets[] = [];

    model = {
        left: true,
        middle: false,
        right: false
    };

    focus;
    focus1;

    public stats;
    public currentUser: User;
    public admins: User[];
    public issues: Issue[];

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private issueService: IssueService,
        private statsService: StatsService
    ) { }

    ngOnInit() {
        this.currentUser = this.authService.currentUserValue;
        this.getAdmins();
        this.getIssues();
        this.getStats();
    }

    public getProfileImageLink(userId: string): string {
        return environment.basePath + '/user/' + userId + '/profile-image';
    }

    public logout(): void {
        this.authService.logout();
    }

    public updateIssueStatus(issueId: string, isResolved: boolean): void {
        this.issueService.updateIssue(issueId, { isResolved: isResolved }).subscribe(updatedIssue => {
            this.issues.find(issue => issue.id === issueId).isResolved = updatedIssue.isResolved;
        });
    }

    public setupRegisteredUsersGraph(graphData): void {
        this.lineChartLabels = graphData.labels;
        this.lineChartData = [{ data: graphData.data }];
    }

    private setupAppointmentsGraph(graphData): void {
        this.barChartLabels = graphData.labels;
        this.barChartData = [{ data: graphData.data }];
    }

    private getAdmins(): void {
        this.userService.findUsers({ role: 'admin' }).subscribe(admins => {
            this.admins = admins;
        });
    }

    private getIssues(): void {
        this.issueService.getAllIssues().subscribe(issues => {
            this.issues = issues.reverse();
        });
    }

    private getStats(): void {
        this.statsService.getStats().subscribe(stats => {
            this.setupRegisteredUsersGraph(stats.graphTotalUsersMonth);
            this.setupAppointmentsGraph(stats.graphAppointments);
            this.stats = stats;
        });
    }
}

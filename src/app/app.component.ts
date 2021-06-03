import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/common';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { SidebarService } from './core/services/sidebar.service';

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 0;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private _router: Subscription;
    public isNavVisible: boolean;
    public isNavExpanded = true;

    constructor(
        private router: Router,
        public location: Location,
        private sidebarService: SidebarService) { }

    ngOnInit() {
        this.subsribeRouteChangeEvents();
        this.subscribeSidebarExpansions();
    }

    private subsribeRouteChangeEvents(): void {
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            if (event.url === '/login') {
                this.isNavVisible = false;
            } else {
                this.isNavVisible = true;
            }
        });
    }

    private subscribeSidebarExpansions(): void {
        this.sidebarService.sidebarExpansion.subscribe(expansion => {
            this.isNavExpanded = expansion;
        });
    }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isExpanded = true;

    constructor(private sidebarService: SidebarService) {
    }

    @ViewChild('navtoggle') myDiv: ElementRef<HTMLElement>;
    ngOnInit() {

    }

    // data-action="sidenav-unpin"
    /*
     pin
     $('.sidenav-toggler').addClass('active');
        $('.sidenav-toggler').data('action', 'sidenav-unpin');
        $('body').removeClass('g-sidenav-hidden').addClass('g-sidenav-show g-sidenav-pinned');
        $('body').append('<div class="backdrop d-xl-none" data-action="sidenav-unpin" data-target='+$('#sidenav-main').data('target')+' />');

     unpin
     $('.sidenav-toggler').removeClass('active');
        $('.sidenav-toggler').data('action', 'sidenav-pin');
        $('body').removeClass('g-sidenav-pinned').addClass('g-sidenav-hidden');
        $('body').find('.backdrop').remove();
    */
    expansionClick(): void {
        this.isExpanded = !this.isExpanded;
        this.sidebarService.click(this.isExpanded);
    }
}

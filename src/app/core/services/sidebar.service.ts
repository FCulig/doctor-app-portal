import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {

    private sidebarExpansionSubject = new BehaviorSubject<boolean>(true);
    sidebarExpansion = this.sidebarExpansionSubject.asObservable();

    constructor() { }

    public click(expansion) {
        console.log(expansion);
        this.sidebarExpansionSubject.next(expansion);
    }
}

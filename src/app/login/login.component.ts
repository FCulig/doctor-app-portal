import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    focus;
    focus1;

    loginForm = new FormGroup({
        phone: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(private authSerivce: AuthService, private router: Router) { }

    ngOnInit() {
    }

    public login(): void {
        console.log(this.loginForm.value);
        this.authSerivce.login(this.loginForm.value).subscribe((val) => {
            console.log(val);
            this.router.navigateByUrl('home')
        });
    }

}

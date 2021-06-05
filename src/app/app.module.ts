import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtHelperService, JwtModuleOptions, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AlertsSectionComponent } from './sections/alerts-section/alerts-section.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { HttpClient, HttpClientModule, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { from } from 'rxjs';
import { AlertComponent } from './shared/alert/alert.component';
import { HttpTransportInterceptor } from './core/interceptors/http.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ChartsModule } from 'ng2-charts';
import { DoctorVerificationComponent } from './doctor-verification/doctor-verification.component';
import { TopNavbarComponent } from './shared/top-navbar/top-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    AlertsSectionComponent,
    AlertComponent,
    DoctorVerificationComponent,
    TopNavbarComponent,
    /*ButtonsSectionComponent,
    InputsSectionComponent,
    CrsSectionComponent,
    NavigationSectionComponent,
    TabsSectionComponent,
    TypographySectionComponent,
    AngularSectionComponent,
    NucleoSectionComponent,
    VersionsSectionComponent,
    NgbdModalComponent,
    NgbdModalContent*/
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgbModule,
    ChartsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HomeModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTransportInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

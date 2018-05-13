import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CommonModule} from '@angular/common';
import {AuthGuard} from './guard/auth.guard';
import {AuthService} from './guard/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {FormsModule} from '@angular/forms';
import {AuthChildGuard} from './guard/auth-child.guard';
import {Constants} from '../assets/constants';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {BlockUIModule} from 'ng-block-ui';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import {MomentModule} from 'angular2-moment'; // optional, provides moment-style pipes for date formatting
import {LoginService} from './services/login/login.service';

export function getToken() {
  return localStorage.getItem('token');
}


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-right',
        closeButton: false
      }
    ),
    AppRoutingModule,
    FormsModule,
    BlockUIModule,
    JwtModule.forRoot({
      config: {
        tokenGetter : getToken ,
        whitelistedDomains: [Constants.SERVER_URL],
        skipWhenExpired: true
      }
    })

  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AuthGuard,
    AuthChildGuard,
    AuthService,
    JwtHelperService,
    LoginService
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule { }




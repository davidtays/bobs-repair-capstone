import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule} from './app-routing';
import {RouterModule, Routes} from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonToggleModule, MatOptionModule, MatSelectModule, MatTableModule, MatRadioGroup, MatRadioButton, MatRippleModule, MatPaginatorModule, MatSortModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import { LoggedInRouteGuardService } from './services/logged-in-route-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MatGridListModule} from '@angular/material/grid-list';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './security/login/login.component';
import { ForgotPasswordComponent } from './security/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './security/reset-password/reset-password.component';
import { ChangeQuestionsComponent } from './admin/change-questions/change-questions.component';
import { ManagementComponent } from './admin/management/management.component';

import { RegisterComponent } from './security/register/register.component';

//AUTH SERVICE

import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SecurityQuestionsComponent } from './security/security-questions/security-questions.component';
import { RepairServicesComponent } from './repair-services/repair-services.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouteLogsComponent } from './route-logs/route-logs.component';

// import { ServerIssueComponent } from './server-issue/server-issue.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    SecurityQuestionsComponent,
    ResetPasswordComponent,
    ChangeQuestionsComponent,
    ManagementComponent,
    MatRadioGroup,
    MatRadioButton,
    RegisterComponent,
    AboutComponent,
    ContactComponent,
    RepairServicesComponent,
    NotFoundComponent,
    RouteLogsComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,     
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatRippleModule,
    MatButtonToggleModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    RouterModule, //look into routerModule
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    MatGridListModule,
  ],
  providers: [LoggedInRouteGuardService,
              AuthenticationService,
              AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
